const bip39 = require('bip39')

module.exports = {
  generateMnemonic: strength => bip39.generateMnemonic(strength),
  seedFromMnemonic: mnemonic => bip39.mnemonicToSeed(mnemonic),
  validateMnemonic: mnemonic => bip39.validateMnemonic(mnemonic)
}