du:
	du -bs --exclude=.git --exclude=bz2/LICENSE --exclude=Makefile --exclude=bible.txt --exclude=script.js

compile:
	# terser bz2/index.js -m -o bz2/index.min.js
	terser script.js  -m -o script.min.js

server:
	python -m http.server 8000