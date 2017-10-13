#!/bin/bash
# Make a copy of original config file
cp config.mainnet.json newconfig.mainnet.json
# Run the javascript file
node scripts/portChange.js
# Checkout the original config file
git checkout config.mainnet.json
# Copy contents from newconfig to config file
cp newconfig.mainnet.json config.mainnet.json
# Run the node using forever command
forever start app.js -c config.mainnet.json -g genesisBlock.mainnet.json
# Kill existing node process running on port 4000
kill `lsof -t -i:4001`
