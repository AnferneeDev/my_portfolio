import json
import os
import boto3
from botocore.exceptions import ClientError

# Initialize the DynamoDB resource outside the handler for connection reuse
dynamodb = boto3.resource('dynamodb')
table_name = os.environ.get('TABLE_NAME', 'PortfolioVisitors')
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    try:
        # Atomic increment of the visits counter
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
                'Access-Control-Allow-Origin': '*', # The HTTP API CORS handles strict origins, but this allows local testing
            },
            'body': json.dumps({
                'visits': visits
            })
        }
    except ClientError as e:
        print(f"Error updating DynamoDB: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Could not update visitor count'})
        }
