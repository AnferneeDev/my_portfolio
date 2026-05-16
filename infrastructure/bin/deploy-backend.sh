#!/usr/bin/env bash
set -e

echo "--------------------------------------------------------"
echo "PHASE 1: BACKEND STACK (API & DB)"
echo "--------------------------------------------------------"

STACK_NAME="portfolio-prod-backend"
REGION="us-east-1"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
INFRA_DIR="$SCRIPT_DIR/.."

cd "$INFRA_DIR"

echo "BUILDING SAM APPLICATION..."
sam build --template-file backend.yaml

echo "PREPARING CHANGE SET..."
# Use sam deploy with --no-execute-changeset to handle packaging to S3 and change set creation
sam deploy \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --resolve-s3 \
    --capabilities CAPABILITY_IAM \
    --no-execute-changeset \
    --tags Key=Project,Value=Portfolio Key=Environment,Value=Prod Key=Phase,Value=Backend
