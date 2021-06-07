#!/bin/bash

echo "Cloning Server Repo from GitHub.com..."
git clone git@github.com:asciiflix/webclient.git
echo "Repo Cloned"

echo "Starting Docker-Compose"
cd ./webclient

echo "Swichting to Master Branch"
git switch master

echo "Starting builded containers"
docker-compose up -d --build

echo "Started Containers..."
echo "Cleaning Up Source Files"
rm -rf ~/server

exit 0
