#!/bin/bash
# Make a copy of original config file
cp config.testnet.json newconfig.testnet.json
# Run the javascript file
node scripts/portChange.js
# Run the node using forever command
forever start app.js -c newconfig.testnet.json -g genesisBlock.testnet.json > a.txt
# Kill existing node process running on port 4000
kill `lsof -t -i:4000`
