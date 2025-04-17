#!/bin/bash

# DESCRIPTION:
# Simple script to automate building and publishing the 
# latest Writr.md container image to the Github container registry.
# Currently this script will work in my local dev environment only! 
# There are plans to add improved CI/CD using Github workflows and actions.

# build and tag images
echo "Starting build process..."

if [[ -n $1 ]]; then
    docker build --platform linux/amd64,linux/arm64 -t ghcr.io/jamesspearsv/writrmd:latest -t ghcr.io/jamesspearsv/writrmd:$1 .
else 
    docker build --platform linux/amd64,linux/arm64 -t ghcr.io/jamesspearsv/writrmd:latest .
fi
# login to github container registry
echo "Logging into ghcr.io..."
echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin

# push updated image to ghcr.io
docker push ghcr.io/jamesspearsv/writrmd:latest
echo "Successfully published image!"