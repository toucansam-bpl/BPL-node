#! /bin/bash
config=$2
genesis=$3

mv $config config.backup.json
mv $genesis genesisBlock.backup.json
#get git branch
branch=$(git symbolic-ref --short HEAD)
git pull origin $branch
mv config.backup.json $config
mv genesisBlock.backup.json $genesis
forever stop `lsof -t -i:$4`
if [[ $1 -eq 1 ]]
  then
     npm install
fi
forever start app.js -c $config -g $genesis
