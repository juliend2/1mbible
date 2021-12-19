async function load(){
    const DEBUG = false
    const DEBUG_LENGHT = 312400
    // Download and decompress bzip2:
    if (!localStorage.getItem('txt', string)) {
        let resp = await fetch('bible.txt.bz2')
        let buff = await resp.arrayBuffer()
        const decompressed = bz2.decompress(new Uint8Array(buff))
        var string = new TextDecoder("utf-8").decode(decompressed)
        localStorage.setItem('txt', string)
    } else {
        var string = localStorage.getItem('txt', string)
    }
    // Decompress extra compression:
    var replaces = {'$s':'shall','$l':'lord','$L':'LORD','$t':'their','$T':'that','$o':'thou','$y':'they','$h':'have','$f':'from','$w':'when'};
    Object.keys(replaces).forEach(k=>{string=string.replace(new RegExp(`\\${k}`, 'g'),replaces[k])})
    var verseTokens = string.slice(0, DEBUG ? DEBUG_LENGHT : -1).split(/\n?(\d+:\d+) /g).slice(1)
    var verses = []
    for (var i=0;i<verseTokens.length;i++) {
        if (i % 2 == 0) {
            verses.push([verseTokens[i]])
        } else {
            verses[verses.length-1].push(verseTokens[i])
        }
    }
    const bookTitles = ["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther","Job","Psalms","Proverbs","Ecclesiastes","Song of Solomon","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation"]
    var books = []
    for (let i = 0; i < verses.length; i++) {
        if (verses[i][0] == '1:1') { // starting a new book?
            books.push([verses[i]])
        } else {
            books[books.length-1].push(verses[i])
        }
    }
    // Put chapters in books:
    for (let i = 0; i < books.length; i++) {
        var chapters = {}
        books[i].forEach(verse => {
            var chapterNumber = verse[0].split(':')[0]
            if (chapterNumber in chapters) {
                chapters[chapterNumber].push(verse)
            } else {
                chapters[chapterNumber] = [verse]
            }
        })
        books[i] = chapters
    }
    window.book = function(bookIndex) {
        window.currentBookIndex = bookIndex
        render(bookIndex, 0)
    }
    window.chapter= function(chapterIndex) {
        window.currentChapterIndex = chapterIndex
        render(window.currentBookIndex, chapterIndex)
    }
    function render(bookIndex, chapterIndex=0) {
        const d = document
        var body = d.querySelector('body')
        body.innerHTML = `
            The book of <select onchange="book(this.value)">${books.map((_,i)=>`<option value="${i}" ${bookIndex==i?'selected':''}>${bookTitles[i]}</option>`).join('')}</select>,
            chapter <select onchange="chapter(this.value)">${Object.keys(books[bookIndex]).map((ci,i)=>`<option value="${i}" ${chapterIndex==i?'selected':''}>${books[bookIndex][ci][0][0].split(':')[0]}</option>`).join('')}</select>
            <div>${books[window.currentBookIndex][`${parseInt(chapterIndex)+1}`].map(verse=>`<p><span>${verse[0].split(':')[1]}</span> ${verse[1]}</p>`).join('')}</div>`
    }
    
    window.currentBookIndex = 42
    window.currentChapterIndex = 0
    render(window.currentBookIndex, window.currentChapterIndex)
}
window.onload = ()=> {
    load()
}