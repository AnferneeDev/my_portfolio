import os
import json
import boto3
from moto import mock_aws
import pytest

# Ensure our app imports with the right environment variable
os.environ['TABLE_NAME'] = 'TestTable'
os.environ['AWS_DEFAULT_REGION'] = 'us-east-1'

from app import lambda_handler

@pytest.fixture
def dynamodb_mock():
    with mock_aws():
        dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
        dynamodb.create_table(
            TableName='TestTable',
            KeySchema=[{'AttributeName': 'id', 'KeyType': 'HASH'}],
            AttributeDefinitions=[{'AttributeName': 'id', 'AttributeType': 'S'}],
            BillingMode='PAY_PER_REQUEST'
        )
        yield dynamodb

def test_lambda_handler_increments_count(dynamodb_mock):
    # First call
    response = lambda_handler({}, {})
    assert response['statusCode'] == 200
    body = json.loads(response['body'])
    assert body['visits'] == 1
    
    # Second call
    response2 = lambda_handler({}, {})
    assert response2['statusCode'] == 200
    body2 = json.loads(response2['body'])
    assert body2['visits'] == 2
