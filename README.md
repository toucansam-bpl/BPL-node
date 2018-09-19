# BPL Node

<p align="center">
    <img src="./banner.png" />
</p>

[![Github Latest Release](https://badgen.now.sh/github/release/blockpool-io/bpl-node)](https://github.com/blockpool-io/bpl-node/releases/latest)
[![License: MIT](https://badgen.now.sh/badge/license/MIT)](https://opensource.org/licenses/MIT)

## Simple Blockpool Node Installation

Download the Blockpool install script

https://github.com/blockpool-io/BPL-node/blob/bpl-mainnet/BPL_Node_Install_Script.sh

Open up your terminal and type

```
./BPL_Node_Install_Script.sh
```

Let the script finish.

### Add configurations for your node

```
# Change the following in config.mainnet.json:

“address“: “set your IP”
“database”: “set database name”
“user”: “set database user”
“password”: “set database password”
“list”: [
  {
    “ip”: “set your IP address”
    “port”: “set the port on which your node will be running”
  },
  {
    “ip”: “Set seed node IP address”
    “port”: “set the port on which seed node will be running”
  }
]
```

### Launch BPL node

#### Mainnet

```
forever start app.js -c config.mainnet.json -g genesisBlock.mainnet.json
```

#### Testnet
```
forever start app.js -c config.testnet.json -g genesisBlock.testnet.json
```

## Detailed steps for setting up BPL node on Linux, Windows and Debian

### Linux/Ubuntu (We have tested with Ubuntu v16.0.4)

#### Install essentials

```
sudo apt-get update
sudo apt-get install -y curl build-essential python git
```

#### Install Node.js (min version: 6.9.2)

```
sudo apt-get install -y nodejs
sudo apt-get install -y npm
sudo npm install -g n
sudo n 6.9.2
```

#### Install grunt-cli (globally)

```
sudo npm install grunt-cli -g
```

#### Install PostgreSQL (min version: 9.5.2)

```
sudo apt-get install -y postgresql postgresql-contrib
sudo -u postgres createuser -P --createdb $USER
createdb ‘Database Name’  (this should match with the database name from config file)
```

#### Clone BPL Node repository

```
git clone https://github.com/blockpool-io/BPL-node.git   (make sure you have git installed)
cd BPL-node
git checkout bpl-mainnet
```

#### Install node modules

```
sudo apt-get install -y libpq-dev
npm install libpq secp256k1
npm install
npm install forever -g
```

#### Add configurations for your node

```
# Change the following in config.mainnet.json:

“address“: “set your IP”
“database”: “set database name”
“user”: “set database user”
“password”: “set database password”
“list”: [
  {
    “ip”: “set your IP address”
    “port”: “set the port on which your node will be running”
  },
  {
    “ip”: “Set seed node IP address”
    “port”: “set the port on which seed node will be running”
  }
]
```

#### Launch BPL node on Mainnet

```
forever start app.js -c config.mainnet.json -g genesisBlock.mainnet.json
```

#### Launch BPL node on Testnet

```
forever start app.js -c config.testnet.json -g genesisBlock.testnet.json
```

### Windows 7

#### Install essentials

- [Python (min version 2.7)](https://www.python.org/downloads/)
- [Visual Studio c++ 2010 express](https://www.microsoft.com/en-gb/download/details.aspx?id=14632)
- [Node.js (min version 6.9.2)](https://nodejs.org/en/download/)
- [PostgreSQL (min version 5.5.2)](http://www.postgresql.org/download/windows/)

#### Add following environment variable

```
PATH as C:\Program Files\PostgreSQL\9.5\bin 
(Windows Start -> Right click on Computer → Advanced System settings → Environment variables)
Modify the file ‘pg_hba’, present at the location  C:\Program Files\PostgreSQL\9.5\data\pg_hba
Replace ‘md5’ with ‘trust’  under ‘METHOD’ column
```

#### Restart psql

```
My Computer → Manage → Services and Application → Services → Restart postgres service
Alter postgres user:
psql -U postgres
alter user postgres with password 'User Password'
Create database:
Create database ‘Database Name’ Name’  (this should match with the database name from config file)
```

#### Clone repository

```
git clone https://github.com/blockpool-io/BPL-node.git (make sure you have git installed)
cd BPL-node
git checkout bpl-mainnet
```

#### Install node modules

```
npm install --global --production windows-build-tools 
npm install libpq secp256k1
npm install
```

#### Add configurations for your node

```
# Change the following in config.mainnet.json:

“address“: “set your IP”
“database”: “set database name”
“user”: “set database user”
“password”: “set database password”
“list”: [
  {
    “ip”: “set your IP address”
    “port”: “set the port on which your node will be running”
  },
  // For 5 Windows nodes, seed IP is already configured in the shared 5 files so no need of adding this entry
  {
    “ip”: “Set seed node IP address”
    “port”: “set the port on which seed node will be running”
  }
]
```

#### Launch BPL node on Mainnet

```
npm run start:bplmainnet
```

#### Launch BPL node on Testnet

```
npm run start:bpltestnet
```

### Debian (We have tested with Jessie 8.7)

#### Install essentials

```
sudo apt-get update
sudo apt-get install -y curl build-essential python git
```

#### Install Node.js (min version: 6.9.2)

```
sudo apt-get install -y nodejs
sudo apt-get intsall -y npm
sudo npm install -g n
sudo n 6.9.2
```

#### Install grunt-cli (globally)

```
sudo npm install grunt-cli -g
```

#### Install PostgreSQL (min version: 9.5.2)

> Since Debian 8.8/8.8 installs psql 9.4.12 , we will need to add the repository manually to install psql 9.5


```
wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ jessie-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
sudo apt-get update
sudo apt-get install -y postgresql-9.5
sudo -u postgres createuser –createdb $USER
createdb ‘Database Name’  (this should match with the database name from config file)
```

#### Clone BPL Node repository

```
If git is not found, following adds the repository manually:
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys E1DD270288B4E6030699E45FA1715D88E1DF1F24
sudo su -c "echo 'deb http://ppa.launchpad.net/git-core/ppa/ubuntu trusty main' > /etc/apt/sources.list.d/git.list"
sudo apt-get -y update
sudo apt-get install -y git

git clone https://github.com/blockpool-io/BPL-node.git   (make sure you have git installed)
cd BPL-node
git checkout mainnet
```

#### Install node modules

```
sudo apt-get install libpq-dev
npm install libpq secp256k1
npm install
```

#### Add configurations for your node

```
# Change the following in config.mainnet.json:

“address“: “set your IP”
“database”: “set database name”
“user”: “set database user”
“password”: “set database password”
“list”: [
  {
    “ip”: “set your IP address”
    “port”: “set the port on which your node will be running”
  },
  {
    “ip”: “Set seed node IP address”
    “port”: “set the port on which seed node will be running”
  }
]
```

#### Launch BPL node on Mainnet

```
npm run start:bplmainnet
```

#### Launch BPL node on Testnet

```
npm run start:bpltestnet
```

## Authors
- [Raj Singh](https://github.com/cyrus19901)
- [Brandon Cook](https://github.com/locohammerhead)
- [FX Thorens](https://github.com/fix)
- [Boris Povod](https://github.com/borispovod)
- [Pavel Nekrasov](https://github.com/freeart)
- [Sebastian Stupurac](https://github.com/bdevelle)
- [Oliver Beddows](https://github.com/karmocoma)
- [All Contributors](../../contributors)

## License
[MIT](LICENSE) © [Blockpool](https://blockpool.io)
