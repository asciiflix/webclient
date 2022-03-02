#!/bin/bash

echo "Cloning Server Repo from GitHub.com..."
git clone git@github.com-webclient:asciiflix/webclient.git

echo "Starting Docker-Compose"
cd ./webclient

echo "Swichting to Master Branch"
git switch master

echo "Starting containers"
VERSION=$1 docker-compose up -d

echo "Cleaning Up Source Files"
rm -rf ~/webclient

exit 0
