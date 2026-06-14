const fs = require("fs");

const QUOTES_FILE = "quotes.json";
const README_FILE = "README.md";
const LAST_QUOTE_FILE = ".last-quote";

const quotes = JSON.parse(
  fs.readFileSync(QUOTES_FILE, "utf8")
);

let lastQuote = "";

if (fs.existsSync(LAST_QUOTE_FILE)) {
  lastQuote = fs.readFileSync(LAST_QUOTE_FILE, "utf8");
}

let selected;

if (quotes.length === 1) {
  selected = quotes[0];
} else {
  do {
    selected = quotes[Math.floor(Math.random() * quotes.length)];
  } while (selected.quote === lastQuote);
}

let readme = fs.readFileSync(README_FILE, "utf8");

const quoteBlock = `${selected.quote}
<br>
<i>— ${selected.author}</i>`;

readme = readme.replace(
  /<!-- QUOTE_START -->([\s\S]*?)<!-- QUOTE_END -->/,
  `<!-- QUOTE_START -->
${quoteBlock}
<!-- QUOTE_END -->`
);

fs.writeFileSync(README_FILE, readme);
fs.writeFileSync(LAST_QUOTE_FILE, selected.quote);
