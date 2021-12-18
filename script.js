const DEBUG = true
const DEBUG_LENGHT = 1400
let resp = await fetch('bible.txt.bz2');
let buff = await resp.arrayBuffer(); 
const decompressed = bz2.decompress(new Uint8Array(buff))
var string = new TextDecoder("utf-8").decode(decompressed);
var d = {'$s':'shall','$l':'lord','$L':'LORD','$t':'their','$T':'that','$o':'thou','$y':'they','$h':'have','$f':'from','$w':'when'};
Object.keys(d).forEach(k=>{string=string.replace(k,d[k])})
var verseTokens = string.slice(0, DEBUG ? DEBUG_LENGHT : -1).split(/\n?(\d+:\d+) /g).slice(1)
var verses = []
for (var i=0;i<verseTokens.length;i++) {
    if (i % 2 == 0) {
        verses.push([verseTokens[i]])
    } else {
        verses[verses.length-1].push(verseTokens[i])
    }
}

console.log(verses)
