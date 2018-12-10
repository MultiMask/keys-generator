#!/usr/bin/env node

var generator = require('./src/index')

var ArgumentParser = require('argparse').ArgumentParser;
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

    console.log(mnemonic)
  } catch (e) {
    console.log(e);
  }
}

function byMnemonic(mn) {

}

var args = parser.parseArgs()
init(args)