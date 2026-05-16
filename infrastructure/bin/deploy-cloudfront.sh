#!/usr/bin/env bash
set -e

echo "--------------------------------------------------------"
echo "PHASE 2: CLOUDFRONT STACK (CDN & EDGE DELIVERY)"
echo "--------------------------------------------------------"

STACK_NAME="portfolio-prod-cloudfront"
REGION="us-east-1" # CloudFront requires us-east-1 for ACM certs
DOMAIN="anfernee.dev"

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
TEMPLATE_PATH="$SCRIPT_DIR/../cloudfront.yaml"

# Convert to Windows path if running in Git Bash/MSYS
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    FINAL_TEMPLATE_FILE="file://$(cygpath -m "$TEMPLATE_PATH")"
else
    FINAL_TEMPLATE_FILE="file://$TEMPLATE_PATH"
fi

echo "FETCHING HOSTED ZONE ID FOR $DOMAIN..."
# We try to get the ID, stripping /hostedzone/ if it exists
HOSTED_ZONE_ID=$(aws route53 list-hosted-zones-by-name --dns-name "$DOMAIN" --query "HostedZones[0].Id" --output text | sed 's|/hostedzone/||')

if [ -z "$HOSTED_ZONE_ID" ] || [ "$HOSTED_ZONE_ID" == "None" ]; then
    echo "ERROR: Could not find Hosted Zone ID for $DOMAIN"
    exit 1
fi
echo "HOSTED ZONE ID: $HOSTED_ZONE_ID"

echo "FETCHING ACM CERTIFICATE ARN FOR $DOMAIN..."
CERT_ARN=$(aws acm list-certificates --region "$REGION" --query "CertificateSummaryList[?DomainName=='$DOMAIN'].CertificateArn" --output text)

if [ -z "$CERT_ARN" ] || [ "$CERT_ARN" == "None" ]; then
    echo "ERROR: Could not find an ACM certificate for $DOMAIN in $REGION"
    exit 1
fi
echo "CERTIFICATE ARN: $CERT_ARN"

echo "PREPARING CHANGE SET..."
CHANGE_SET_NAME="changeset-$(date +%s)"

if ! aws cloudformation describe-stacks --stack-name "$STACK_NAME" --region "$REGION" > /dev/null 2>&1; then
    CHANGE_SET_TYPE="CREATE"
    echo "STACK NOT FOUND. SETTING TYPE TO: CREATE"
else
    CHANGE_SET_TYPE="UPDATE"
    echo "STACK FOUND. SETTING TYPE TO: UPDATE"
fi

aws cloudformation create-change-set \
    --template-body "$FINAL_TEMPLATE_FILE" \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --change-set-name "$CHANGE_SET_NAME" \
    --change-set-type "$CHANGE_SET_TYPE" \
    --parameters ParameterKey=DomainName,ParameterValue=$DOMAIN ParameterKey=HostedZoneId,ParameterValue=$HOSTED_ZONE_ID ParameterKey=CertificateArn,ParameterValue=$CERT_ARN \
    --tags Key=Project,Value=Portfolio Key=Environment,Value=Prod Key=Phase,Value=CloudFront \
    --capabilities CAPABILITY_IAM

echo "WAITING FOR CHANGE SET TO BE CREATED..."
aws cloudformation wait change-set-create-complete \
    --stack-name "$STACK_NAME" \
    --change-set-name "$CHANGE_SET_NAME" \
    --region "$REGION"

echo "--------------------------------------------------------"
echo "CHANGE SET SUMMARY"
echo "--------------------------------------------------------"
aws cloudformation describe-change-set \
    --stack-name "$STACK_NAME" \
    --change-set-name "$CHANGE_SET_NAME" \
    --region "$REGION" \
    --query "Changes[].{Action:ResourceChange.Action, LogicalId:ResourceChange.LogicalResourceId, Type:ResourceChange.ResourceType, Replacement:ResourceChange.Replacement}" \
    --output table

echo "--------------------------------------------------------"
echo "EXECUTE CHANGESET WITH:"
echo "--------------------------------------------------------"
echo "aws cloudformation execute-change-set --stack-name $STACK_NAME --change-set-name $CHANGE_SET_NAME --region $REGION"
echo "--------------------------------------------------------"
