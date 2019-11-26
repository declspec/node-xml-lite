# node-xml-lite2

A stripped down fork of https://github.com/hgourvest/node-xml-lite
 - This is a pure javascript XML SAX parser for Node.js.
 - The specificity of this xml parser is that it can parse a document from a Buffer.
 - It relies on iconv-lite to decode the text according to the code page of the document.
 
Differences from node-xml-lite
---
- Removed all `SAXParse*` API variants until I have time to rewrite them into a `parseStream` API
- Exported the raw `XmlParser` class to allow for custom, lightweight parsing jobs (somewhat making up for the removal of the `SAXParse*` APIs)
- Added TypeScript definition file
- Added an `offset` property to the parser to complement `line` + `col`



## Installation
```bash
npm install node-xml-lite2
```

## Sample usage
    
### Parse a file 
 
```js
var xml = require('node-xml-lite2');
xml.parseFile('~/test.xml', function(err, root) {
  // ...
});
```
    
### Parse a file synchronously
```js
var xml = require('node-xml-lite2');
var root = xml.parseFileSync('~/test.xml');
```
    
### Parse a string
```js
var xml = require('node-xml-lite2');
xml.parseString('<xml>hello</xml>');
```

### Parse a buffer
```js
var xml = require('node-xml-lite2');
xml.parseBuffer(Buffer.from('<xml>hello</xml>', 'utf8'));
```

## Advanced usage

### Custom parsing
```js
var xml = require('node-xml-lite2');
var parser = new xml.XmlParser();
var buffer = fs.readFileSync('~/large-file.xml');

parser.parseBuffer(buffer, buffer.length, function(state, name, value) {
  switch (state) {
    case xml.xtOpen:
      console.log('opening:', name);
      break;
    case xml.xtClose:
      console.log('closing:', name);
      break;
    case xml.xtAttribute:
      console.log('attribute:', name + '=' + value);
      break;
    case xml.xtCData:
      console.log('CDATA:', name);
      break;
    case xml.xtComment:
      console.log('comment:', name);
      break;
  }

  return true;
});
```