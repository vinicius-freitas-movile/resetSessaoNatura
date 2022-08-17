#!/bin/sh

set -ex

npm install
npm run build

BUILD_PATH=build/
BUCKET=s3://naturasessao/

aws s3 cp $BUILD_PATH $BUCKET --recursive --exclude "*.js" --exclude "*.css" --acl public-read --profile default
aws s3 cp $BUILD_PATH $BUCKET --recursive --exclude "*" --include "*.js" --content-type "text/javascript" --acl public-read --profile default
aws s3 cp $BUILD_PATH $BUCKET --recursive --exclude "*" --include "*.css" --content-type "text/css" --acl public-read --profile default

aws cloudfront create-invalidation --distribution-id E45L8DVN37HFM --paths "/*" --profile default