let resp = await fetch('bible.txt.bz2');
let buff = await resp.arrayBuffer(); 
const decompressed = bz2.decompress(new Uint8Array(buff))
var string = new TextDecoder("utf-8").decode(decompressed);
var d = {'$s':'shall','$l':'lord','$L':'LORD','$t':'their','$T':'that','$o':'thou','$y':'they','$h':'have','$f':'from','$w':'when'};
Object.keys(d).forEach(k=>{string=string.replace(k,d[k])})
console.log(string.slice(0, 1000).split(/\n?(\d+:\d+) /g))
