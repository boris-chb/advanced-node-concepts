process.env.UV_THREADPOOL_SIZE = 5;

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();

function doRequest() {
  https
    .request('https://www.google.com/', (res) => {
      res.on('data', () => {
      });
      res.on('end', () => {
        console.log('https:', Date.now() - start)
      });
    })
    .end();
}

function doHash() {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('Hash:', Date.now() - start);
  });
}


function readFile() {
  fs.readFile('multitask.js', 'utf8', () => {
    console.log('FS:', Date.now() - start);
  });
}




doRequest();

readFile()

doHash();
doHash();
doHash();
doHash();

console.log(`
  Your random number is: ${Math.random()}
  (edit any file to auto-restart this script)
`);
