# 1MBible

Small app to read the Bible in your browser. The code AND the holy scriptures fit in 1MB. 

And that's the whole point of this project.



## Dependencies

- [https://github.com/SheetJS/bz2/](https://github.com/SheetJS/bz2/)

## Development

I use this as my dev server:

```bash
python -m http.server 8000
```

Use [terser](https://github.com/terser/terser) to compile. Here's the command:

```bash
terser script.js -m -o script.min.js
```

Make sure it all fits within 1MB (what is needed for the site to function):

```bash
du -bs --exclude=.git --exclude=bz2/LICENSE --exclude=Makefile --exclude=bible.txt --exclude=script.js --exclude=README.md
```

## Thanks

- King James Version of the Bible taken here: [https://github.com/mxw/grmr](https://raw.githubusercontent.com/mxw/grmr/master/src/finaltests/bible.txt)
- [1mb.club](https://1mb.club/) for the inspiration.