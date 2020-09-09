#!/bin/bash

export BUILD_HOME=$(pwd)

build_nodejs_script_path="$BUILD_HOME/build_nodejs.sh"

echo "build_nodejs_script_path: $build_nodejs_script_path"

chmod +x $build_nodejs_script_path

echo "start exec build nodejs: $build_nodejs_script_path"

$build_nodejs_script_path

pwd

cd $BUILD_HOME/dist

pwd

tar czvf sumeru-app.tgz *

mv sumeru-app.tgz ../
