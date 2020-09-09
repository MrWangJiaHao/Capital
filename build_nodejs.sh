#!/bin/bash
echo "start build ....."

pwd

cd $BUILD_HOME

pwd

echo "install npm env"

npm config set sass_binary_site http://tnpm.oa.com/mirrors/node-sass
npm install --registry=http://r.tnpm.oa.com --proxy=http://r.tnpm.oa.com:80 --verbose
npm run build
