#!/bin/sh

export OXYGEN_DEPLOYMENT_TOKEN="$INPUT_OXYGEN_DEPLOYMENT_TOKEN"

oxygenctl --version
oxygenctl deploy \
  --assets-dir "$INPUT_OXYGEN_ASSETS_DIR" \
  --worker-file "$INPUT_OXYGEN_WORKER_FILE" \
  --dms-address "$INPUT_OXYGEN_DMS_ADDRESS"

# Hardcoded URL for now
echo "::set-output name=url::https://project-h2.myshopify.dev"
