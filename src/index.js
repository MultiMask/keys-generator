const bip39 = require('bip39');

module.exports = {
  generateMnemonic: (strength) => bip39.generateMnemonic(strength),
  
}