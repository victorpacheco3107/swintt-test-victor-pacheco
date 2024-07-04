#!/bin/bash

declare bucket="asb-lambdas-deploy"
declare stackName="swintt-test-victor-pacheco-stack"

uuid=$(uuidgen)
keyFile="${uuid}.zip"

cd lambda-function
npm install
npm run build
cd dist
zip -r ../../"$keyFile" *.js
cd ../..

echo "aws s3 cp $keyFile s3://$bucket"
aws s3 cp "$keyFile" s3://$bucket

declare parameterOverrides="lambdaS3Bucket=$bucket lambdaS3Key=$keyFile"

echo "sam package --template-file template.yml --output-template-file serverless-output.yaml --s3-bucket $bucket"
sam package --template-file template.yml --output-template-file serverless-output.yaml --s3-bucket $bucket

echo "sam deploy --template-file serverless-output.yaml --stack-name $stackName --capabilities CAPABILITY_IAM --parameter-overrides $parameterOverrides"
sam deploy --template-file serverless-output.yaml --stack-name $stackName --capabilities CAPABILITY_IAM --parameter-overrides $parameterOverrides

rm serverless-output.yaml
rm "$keyFile"



