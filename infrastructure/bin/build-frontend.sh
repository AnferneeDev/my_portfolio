#!/usr/bin/env bash
set -e

STACK_NAME="portfolio-prod-backend"
REGION="us-east-1"

echo "Fetching API Gateway URL from CloudFormation stack: $STACK_NAME..."
API_URL=$(aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$REGION" \
  --query "Stacks[0].Outputs[?OutputKey=='ApiEndpoint'].OutputValue" \
  --output text 2>/dev/null || echo "")

if [ -z "$API_URL" ] || [ "$API_URL" == "None" ]; then
    echo "ERROR: Could not find ApiEndpoint output."
    echo "Please ensure the backend stack is deployed first."
    exit 1
fi

echo "Found API URL: $API_URL"

echo "Building Next.js application..."
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR/../.." # Go to project root

# Export the variable so Next.js build picks it up
export NEXT_PUBLIC_API_URL="$API_URL"
npm run build

# -------------------------------------------------------
# Generate root index.html from the English locale page.
# Next.js with next-intl exports /en.html, not /index.html.
# CloudFront serves index.html at root, so we copy en.html
# directly — no redirect loop, no extra round-trip.
# -------------------------------------------------------
echo "Generating root index.html from English locale..."
cp out/en.html out/index.html

echo "Build complete! The static files are in the 'out/' directory."
echo "Root: anfernee.dev/ → served as English locale"
