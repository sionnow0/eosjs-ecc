var fs = require('fs');
var readline = require('readline');
const ecc = require('./api_common')

/*
* 按行读取文件内容
* 返回：字符串数组
* 参数：fReadName:文件名路径
*      callback:回调函数
* */
function readFileToArr(fReadName){
    var fRead = fs.createReadStream(fReadName);
    var objReadline = readline.createInterface({
        input:fRead
    });
    var arr = new Array();
    const mainAcount = new Set();
    objReadline.on('line',function (line) {
        arr.push(line);
        // console.log('line:'+ line);
    });
    objReadline.on('close',function () {

        arr.forEach(x => mainAcount.add(x))


        console.log("Load Total Acounts Num:", (mainAcount.size))
        tryNum = 1000000
        for (i = 0; i < tryNum; i++) {

            keyobj = genOneRandomKey()
            if (mainAcount.has(keyobj.pub)) {
                console.log("aim at, pub:", keyobj.pub, " pri:", keyobj.pri)
            } else {
                // console.log("not aim at anyone")
            }
        }
        console.log("Run End, Total Try Num:", tryNum)
    });
}

var debug_first = true
function genOneRandomKey() {
    str1 = randomWord(true, 1, 5000)

    if (debug_first) {
        str1 = "how"
        debug_first = false
    }
    prikey = ecc.seedPrivate(str1)
    pubkey = ecc.privateToPublic(prikey)
    // console.log("gen private: ", prikey)
    // console.log("gen public: ", pubkey)
    return {pri:prikey, pub:pubkey}
}

// readFileToArr('E:\\atmp\\sz_download\\eos_snapshot1.txt', function (data) {
//     console.log(data)
// } )

// 入口
readFileToArr('../resource/eos_snapshot1.txt')



function randomWord(randomFlag, min, max){
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}

