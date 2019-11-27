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
// 32 * 8 = 256
console.log("sha256:", c)
/*
sha256原理：https://blog.csdn.net/u011583927/article/details/80905740

对于任意长度的消息，SHA256都会产生一个256bit长的哈希值，称作消息摘要。

 一、信息预处理
    STEP1：附加填充比特
        填充是这样进行的：先补第一个比特为1，然后都补0，直到长度满足对512取模后余数是448。
        总共64B, 64 * 8 = 512bit
    STEP2：附加长度值
        附加长度值就是将原始数据（第一步填充前的消息）的长度信息补到已经进行了填充操作的消息后面。
        SHA256用一个64位的数据来表示原始消息的长度。
        因此，通过SHA256计算的消息长度必须要小于2^64，当然绝大多数情况这足够大了。
        回到刚刚的例子，消息“abc”，3个字符，占用24个bit

        因此，在进行了补长度的操作以后，整个消息就变成下面这样了（16进制格式）
        61626380 00000000 00000000 00000000
        00000000 00000000 00000000 00000000
        00000000 00000000 00000000 00000000
        00000000 00000000 00000000 00000018
 二、逻辑运算
    后面好长，还没看，TODO。。。
 */


/*
私钥生成
一、用的都是SECP256k1椭圆曲线
从公钥生成地址的过程稍微有点不一样，具体过程如下：
1.跟比特币一样，根据原始的私钥生成压缩版的公钥
2.对第1步的公钥ripemd160运算
3.对第2步的结果取前面四位作为校验和
4. 将前缀‘EOS’和 第2步和第3步的结果拼接在一起就得到了地址
 */
d = keyPrivate.fromBuffer(c)
console.log(d)

private_str = d.toString()
console.log(private_str)

// 以下秘钥将从secret这个单词生成出来
console.log("secret private: ", ecc.seedPrivate('how much wood could a woodchuck chuck if a woodchuck could chuck wood'))
console.log("secret public: ", ecc.privateToPublic(ecc.seedPrivate('中国上海')))

/*
  1 //引入eosjs
  2 var ecc = require('eosjs-ecc')
  3
  4 ecc.randomKey().then(privateKey => {
  5 console.log('Private Key:\t', privateKey) // wif
  6 console.log('Public Key:\t', ecc.privateToPublic(privateKey)) // EOSkey...
  7 })
  8
  9 console.log(ecc.seedPrivate('secret'))
 10 console.log(ecc.privateToPublic(ecc.seedPrivate('secret')))
 11
 12 console.log(ecc.seedPrivate('secret1'))
 13 console.log(ecc.privateToPublic(ecc.seedPrivate('secret1')))
 14
 15 a = ecc.sign('I am alive', ecc.seedPrivate('secret'))
 16 console.log(a)

 */