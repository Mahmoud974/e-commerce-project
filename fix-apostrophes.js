const fs = require("fs");
const path = require("path");

function replaceApostrophesInFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");

  const fixedContent = content.replace(
    /(?<=[a-zA-ZÀ-ÿ0-9])'(?=[a-zA-ZÀ-ÿ0-9])/g,
    "&#39;"
  );

  if (content !== fixedContent) {
    fs.writeFileSync(filePath, fixedContent, "utf-8");
  
  }
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith(".tsx")) {
      replaceApostrophesInFile(fullPath);
    }
  });
}

walkDir(path.join(__dirname, "src"));
