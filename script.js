#!/usr/bin/env node

const chalk = require('chalk')
const ArgumentParser = require('argparse').ArgumentParser
const generator = require('./src/index')

const btc = require('./src/btc')

const ctx = new chalk.constructor({level: 3});
const log = console.log
const say = (key, value) => log(chalk`${key} {green ${value}}`)

const providers = [btc]

var parser = new ArgumentParser({
  version: '0.0.1',
  addHelp:true,
  description: 'Key generator'
});
parser.addArgument(
  [ '-e', '--entropy' ],
  {
    help: 'set entropy to generate'
  }
);
parser.addArgument(
  [ '-m', '--mnemonic' ],
  {
    help: 'set mnemonic phrase'
  }
);

function init(args) {
  if (args.mnemonic) return byMnemonic(args.mnemonic)

  return byEntropy(args.entropy)
}

function byEntropy(en) {
  try {
    const mnemonic = generator.generateMnemonic(args.entropy)
    log(chalk`Mnemonic: {green ${mnemonic}}`)
    
    const seed = generator.seedFromMnemonic(mnemonic)
    log(chalk`Seed: {green ${seed.toString('hex')}}`)
    
    providers.forEach(pr => {
      const res = pr()

      log('\n');
      say('---', res.title)
      say('PrivateKey:', res.private)
      say('PublicKey: ', res.public)
      say('Address:   ', res.address)
    })
  } catch (e) {
    log(chalk`Something wrong: {red ${e}}`)
  }
}

function byMnemonic(mn) {

}

var args = parser.parseArgs()
init(args)