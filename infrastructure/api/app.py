import json
import os
import urllib.request
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table_name = os.environ.get('TABLE_NAME', 'PortfolioVisitors')
table = dynamodb.Table(table_name)
secrets = boto3.client('secretsmanager')

GITHUB_SECRET_ID = os.environ.get('GITHUB_TOKEN_SECRET_ID', 'portfolio/github-calendar-token')
GITHUB_USERNAME = os.environ.get('GITHUB_USERNAME', 'AnferneeDev')

def _get_github_token():
    response = secrets.get_secret_value(SecretId=GITHUB_SECRET_ID)
    return response['SecretString']

def _fetch_calendar(username):
    token = _get_github_token()
    query = """
        query($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                    contributionLevel
                  }
                }
              }
            }
          }
        }
    """
    req = urllib.request.Request(
        'https://api.github.com/graphql',
        data=json.dumps({'query': query, 'variables': {'username': username}}).encode('utf-8'),
        headers={'Content-Type': 'application/json', 'Authorization': f'bearer {token}'},
        method='POST',
    )
    with urllib.request.urlopen(req, timeout=5) as resp:
        body = json.loads(resp.read().decode('utf-8'))
    calendar = body['data']['user']['contributionsCollection']['contributionCalendar']
    return calendar

def lambda_handler(event, context):
    route = (event.get('routeKey') or '').lower()
    path = (event.get('rawPath') or '').lower()

    if route == 'get /github-calendar' or path == '/github-calendar':
        try:
            calendar = _fetch_calendar(GITHUB_USERNAME)
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps(calendar),
            }
        except Exception as e:
            print(f"Error fetching GitHub calendar: {e}")
            return {
                'statusCode': 502,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Could not fetch GitHub calendar'}),
            }

    try:
        response = table.update_item(
            Key={'id': 'visits'},
            UpdateExpression='ADD visits :inc',
            ExpressionAttributeValues={':inc': 1},
            ReturnValues='UPDATED_NEW'
        )
        visits = int(response['Attributes']['visits'])
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            'body': json.dumps({'visits': visits})
        }
    except ClientError as e:
        print(f"Error updating DynamoDB: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Could not update visitor count'})
        }
