/* eslint-disable */

const fs = require('fs');
const http = require('http');
const os = require("os");

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const baseFile = '../../../app/Views/layout/';

let componentObj = {
  name : null,
}

function promptName() {
  readline.question(`\x1b[34m Layout name ? `, (name) => {
    componentObj.name = name
    if (fs.existsSync(`${baseFile}${name}`)){
      console.log(`\x1b[31m`, `Layout already exist`)
      promptName()
    } else {
      createFile()
    }
  })
}

function createFile() {
    readline.close()
    if (!fs.existsSync(`${baseFile}${componentObj.name}`)){
      fs.mkdirSync(`${baseFile}${componentObj.name}`);
      
      fs.appendFile(`${baseFile}${componentObj.name}/${componentObj.name}.twig`, '', function (err) {
        if (err) throw err;
      });

      fs.appendFile(`${baseFile}${componentObj.name}/_${componentObj.name}.scss`, '', function (err) {
        if (err) throw err;
      });
    }

    console.log(`\x1b[32m`, `Success`)
}

promptName()
