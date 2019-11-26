const keyPrivate = require('./key_private')
const hash = require('./hash');
const randomBytes = require('randombytes');

console.log(randomBytes(1))
const hash_array = []
hash_array.push(randomBytes(1))

// var i1 = new Buffer('Hello');
// var i2 = new Buffer(' ');
// var i3 = new Buffer('World');
// b = Buffer.concat([i1, i2, i3]).toString()
// console.log(b)

a = Buffer.concat(hash_array)
console.log(a)

c = hash.sha256(Buffer.concat(hash_array))
console.log(c)

// 32 * 8 = 256
d = keyPrivate.fromBuffer(c)
console.log(d)

private_str = d.toString()
console.log(private_str)