/* eslint-disable */

const path = require('path');
const url = require('url');
const https = require('https');
const fs = require('fs');
const inquirer = require('inquirer');
let listOfLibrary = null

let fileList = [];
let currentType = null;
let pathToDownload = './'

let jsPath = '../../app/sources/javascript/helpers/'
let scssPath = '../../app/sources/sass/themes/'

var questionsOne = [
  {
    type: 'list',
    name: 'type',
    message: 'Choose your type of scropt',
    choices: ['js', 'scss']
  },
];

var questions = [
  {
    type: 'list',
    name: 'script',
    message: 'Choose your library',
    choices: fileList,
    when: function(answers) {
      return answers.comments !== 'Nope, all good!';
    }
  },
];

function downloadFile(name, path, type) {
  let downloadPath = `${path}${name}`;
  let file = fs.createWriteStream(downloadPath);
  
  https.get(`https://raw.githubusercontent.com/flinked/Library/master/${type}/${name}`, function (response) {
      response.pipe(file);
  
      file.on('finish', function() {
          file.close();
          console.log(" ✨ Sucess");
      })
  }).on('error', function (err) {
  
      console.log(" 🤭 Oups " + err.message);
      fs.unlink(downloadPath);
  });
}


// downloadFile('DropDown.js')


function UserInterface() {
  inquirer.prompt(questionsOne).then(answers => {
    let type = 'js'
    if(answers.type === "js") {
      pathToDownload = jsPath
      type = "js"
    } else if(answers.type === "scss") {
      pathToDownload = scssPath
      type = "scss"
    }

    MakeList(answers.type)
    inquirer.prompt(questions).then(answersB => {
      downloadFile(answersB.script, pathToDownload, type)
    });
  });
}

function MakeList(type) {
  currentType = type
  listOfLibrary[currentType].forEach(element => {
    fileList.push(element.name)
  });
}

// UserInterface()

getList()

function getList() {

  if (fs.existsSync('./file.json')){
    fs.unlink('./file.json', (err) => {
      if (err) {
        console.error(" 🤭 Oups " + err)
        return
      } else {
        downloadList()
      }
    })
  } else {
    downloadList()
  }
}

function downloadList() {
  let file = fs.createWriteStream('./file.json');

  https.get(`https://raw.githubusercontent.com/flinked/Library/master/file.json`, function (response) {
      response.pipe(file);
  
      file.on('finish', function() {
          file.close();
          listOfLibrary = require('./file.json')
          UserInterface()
      })
  }).on('error', function (err) {
      console.log(" 🤭 Oups " + err.message);
      fs.unlink(downloadPath);
  });
}