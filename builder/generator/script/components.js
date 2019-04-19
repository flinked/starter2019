/* eslint-disable */

const fs = require('fs');
const http = require('http');
const os = require("os");

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const baseFile = '../../../app/Views/Components/';

let componentObj = {
  name : null,
}

function promptName() {
  readline.question(`\x1b[34m Components name ? `, (name) => {
    componentObj.name = name
    if (fs.existsSync(`${baseFile}${name}`)){
      console.log(`\x1b[31m`, `components already exist`)
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
      
      fs.appendFile(`${baseFile}${componentObj.name}/${componentObj.name}.twig`, writeInside(), function (err) {
        if (err) throw err;
      });

      fs.appendFile(`${baseFile}${componentObj.name}/_${componentObj.name}.scss`, '', function (err) {
        if (err) throw err;
      });
    }

    console.log(`\x1b[32m`, `Success`)
}

function writeInside() {
  const includString = `
  {# to include your components #}
  {% include 'views/components/${componentObj.name}/${componentObj.name}.twig' 
    with {
        'data': {
            'data': 'test'
        },
    } 
  %}
  `

  return includString
}

promptName()
