#!/bin/bash
# Make a copy of original config file
cp config.testnet.json newconfig.testnet.json
# Run the javascript file
node scripts/portChange.js
# Checkout the original config file
git checkout config.testnet.json
# Copy contents from newconfig to config file
cp newconfig.testnet.json config.testnet.json
# Run the node using forever command
forever start app.js -c config.testnet.json -g genesisBlock.testnet.json
# Kill existing node process running on port 4000
kill `lsof -t -i:4000`
