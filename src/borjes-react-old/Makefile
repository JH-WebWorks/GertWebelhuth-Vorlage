DIST:=$(patsubst src/%.jsx, dist/%.js, $(wildcard src/*.jsx))
DIST+=$(patsubst src/%.less, dist/%.css, $(wildcard src/*.less))

all: $(DIST)

dist/%.js: src/%.jsx
	mkdir -p dist
	node_modules/.bin/babel $< >$@

dist/%.css: src/%.less
	mkdir -p dist
	lessc $< >$@

test: test/bundle.js

test/bundle.js: test/main.jsx $(DIST)
	browserify -t babelify -e $< -o $@

clean:
	rm -rf dist

.PHONY: test clean
