const fs = require('fs');

const fileContent = fs.readFileSync('types.ts', 'utf8');

// Find the PageView enum block.
const pageViewRegex = /export enum PageView \{[\s\S]*?\}/;
const match = fileContent.match(pageViewRegex);

if (match) {
    let newEnum = `export enum PageView {
  HOME = 'HOME',
  BIO = 'BIO',
  GENEALOGY = 'GENEALOGY',
  ENGINEERING = 'ENGINEERING',
  TRADES = 'TRADES',
  DEEP_DIVE = 'DEEP_DIVE'
}`;
    
    const newContent = fileContent.replace(pageViewRegex, newEnum);
    fs.writeFileSync('types.ts', newContent);
    console.log("Successfully updated types.ts");
} else {
    console.log("Could not find PageView block");
}
