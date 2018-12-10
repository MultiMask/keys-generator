const bitcoin = require('bitcoinjs-lib')
const bip39 = require('bip39')

module.exports = (seed, index = 0) => {
  const path = `m/44'/0'/0'/0/${index}`
  const keys = bitcoin.bip32.fromSeed(bip39.mnemonicToSeed(seed), bitcoin.networks.bitcoin).derivePath(path)

  const p2wpkh = bitcoin.payments.p2wpkh({ pubkey: keys.publicKey, network: keys.network })
  const address = bitcoin.payments.p2sh({ redeem: p2wpkh, network: keys.network }).address

  return {
    title: 'BTC mainnet SegWit',
    private: keys.privateKey.toString('hex'),
    public: keys.publicKey.toString('hex'),
    address
  }
}