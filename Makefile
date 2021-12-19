.PHONY: all du server

BUILD_DIR := ./dist
INDEX := index.html
SCRIPT_MIN := script.min.js
STYLE_MIN := style.min.css

du:
	du -bs dist/ --exclude=dist/bz2/LICENSE

dev:
	python -m http.server 8000 --directory .

test:
	python -m http.server 8001 --directory dist/

$(BUILD_DIR)/$(SCRIPT_MIN):
	terser script.js -m -o $(BUILD_DIR)/$(SCRIPT_MIN)

$(BUILD_DIR)/$(STYLE_MIN):
	uglifycss style.css > $(BUILD_DIR)/$(STYLE_MIN)

$(BUILD_DIR)/bz2:
	cp -r bz2 $(BUILD_DIR)/bz2

$(BUILD_DIR)/bible.txt.bz2:
	cp bible.txt.bz2 $(BUILD_DIR)/bible.txt.bz2

$(BUILD_DIR)/$(INDEX): $(BUILD_DIR)/$(SCRIPT_MIN) $(BUILD_DIR)/$(STYLE_MIN) $(BUILD_DIR)/bz2 $(BUILD_DIR)/bible.txt.bz2
	cp index.html $(BUILD_DIR)/$(INDEX)
	sed -i 's/.css/.min.css/g' $(BUILD_DIR)/$(INDEX)
	sed -i 's/script.js/script.min.js/g' $(BUILD_DIR)/$(INDEX)
	

$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

all: $(BUILD_DIR) $(BUILD_DIR)/$(INDEX)

.PHONY: clean

clean:
	rm -r $(BUILD_DIR)