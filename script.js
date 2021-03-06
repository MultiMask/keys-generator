#!/usr/bin/env node

const ArgumentParser = require('argparse').ArgumentParser
const generator = require('./src/index')
const chalk = require('chalk')

const btc = require('./src/btc')
const eos = require('./src/eos')

const { log } = console

const providers = [btc, eos]

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
    
    providers.forEach(pr => { log(); pr(seed)})
  } catch (e) {
    log(chalk`Something wrong: {red ${e}}`)
  }
}

function byMnemonic(mnemonic) {
  try {
    const isValid = generator.validateMnemonic(mnemonic)
    log(chalk`Mnemonic: {green ${mnemonic}}`)
    
    if (isValid) {
      const seed = generator.seedFromMnemonic(mnemonic)
      log(chalk`Seed: {green ${seed.toString('hex')}}`)
      
      providers.forEach(pr => { log(); pr(seed)})
    } else {
      log(chalk`{red Not Valid Mnemonic}`)
    }
  } catch (e) {
    log(chalk`Something wrong: {red ${e}}`)
  }
}

var args = parser.parseArgs()
init(args)