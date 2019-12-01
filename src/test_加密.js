const ecc = require('./api_common')

someonesPrivateKey = ecc.seedPrivate("someone");
someonesPublicKey = ecc.privateToPublic(someonesPrivateKey);

console.log('someonesPrivateKey:\t', someonesPrivateKey.toString())
console.log('someonesPublicKey:\t', someonesPublicKey.toString())

myPrivate = ecc.seedPrivate("my");
myPublic = ecc.privateToPublic(myPrivate);

console.log('myPrivate:\t', myPrivate.toString())
console.log('myPublic:\t', myPublic.toString())

message = "hhello"
const encryptUuid = ecc.Aes.encrypt
ecc.Aes.encrypt()
encryptedMessage = encryptUuid(myPrivate, someonesPublicKey, message)//MY用自己的私钥和someone的公钥进行加密
decryptedMessage = ecc.Aes.decrypt(someonesPrivateKey, myPublic, encryptedMessage.nonce, encryptedMessage.message, encryptedMessage.checksum)//someone用自己的私钥和my的公钥进行解密