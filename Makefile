du:
	du -bs --exclude=.git --exclude=bz2/LICENSE --exclude=Makefile

compile:
	terser bz2/index.js -o bz2/index.min.js

server:
	python -m http.server 8000