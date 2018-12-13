const chalk = require('chalk')
const { log } = console

const bitcoin = require('bitcoinjs-lib')
const bip39 = require('bip39')

module.exports = (seed, index = 0) => {
  log(seed)
  const path = `m/44'/0'/0'/0/${index}`
  const keys = bitcoin.bip32.fromSeed(seed, bitcoin.networks.bitcoin).derivePath(path)

  const p2wpkh = bitcoin.payments.p2wpkh({ pubkey: keys.publicKey, network: keys.network })
  const address = bitcoin.payments.p2sh({ redeem: p2wpkh, network: keys.network }).address

  log(chalk`----- {yellow BTC mainnet}`)
  log(chalk`PrivateKey WIF {green ${keys.toWIF()}}`)
  log(chalk`PrivateKey HEX {green ${keys.privateKey.toString('hex')}}`)
  log(chalk`PublicKey HEX  {green ${keys.publicKey.toString('hex')}}`)

  log(chalk`Address        {green ${address}}`)
}