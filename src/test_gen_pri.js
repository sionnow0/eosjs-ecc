/*
https://nodejs.org/en/
node版本如果不够，要用上面这个安装，windos版本的
node -v
v12.13.1
npm -v
6.13.1
安装之后的版本如上
 */

const keyPrivate = require('./key_private')
const hash = require('./hash');
const randomBytes = require('randombytes');
const ecc = require('./api_common')



ecc.unsafeRandomKey().then(privateKey => {console.log("pri:", privateKey)})


