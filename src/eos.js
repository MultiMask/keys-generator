const chalk = require('chalk')
const { log } = console

const bitcoin = require('bitcoinjs-lib')
const wif = require('wif')
const Eos = require('eosjs')
const { ecc, Fcbuffer } = Eos.modules;

module.exports = async (seed, index = 0) => {
  const path = `m/44'/194'/0'/0/${index}`
  const keys = bitcoin.bip32.fromSeed(seed).derivePath(path)

  const privateKey = wif.encode(128, keys.privateKey, false)
  const publicKey = await ecc.privateToPublic(privateKey)

  log(chalk`----- {yellow EOS}`)
  log(chalk`PrivateKey WIF {green ${privateKey}}`)
  log(chalk`PublicKey      {green ${publicKey}}`)
}