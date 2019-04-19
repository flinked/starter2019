/* eslint-disable */

const fs = require('fs');
const http = require('http');
const os = require("os");

const baseJson = '../';
const baseFile = '../../../app/Views/pages/';

const waitFor = (ms) => new Promise(r => setTimeout(r, ms))

const includeArray = {
  folder: [],
  file: [],
}

let jsonObj = null;

fs.readFile(`${baseJson}acf.json`, function(err, data) {
  jsonObj = JSON.parse(data)
  parseJson()
});

function parseJson() {
  jsonObj.forEach((element, key) => {
    parseGroupe(element)
  });

  includePage()
}

function parseGroupe(data) {
  let title = data.title
  let titleArray = title.split('-')
  let folderName = titleArray[0].toLowerCase();
  let fileName = titleArray[1].toLowerCase();

  createFile(folderName, fileName, data.fields)
}

function createFile(folder, file, fields) {
  if (!fs.existsSync(`${baseFile}${folder}`)){
    fs.mkdirSync(`${baseFile}${folder}`);
    includeArray.file[folder] = []
    includeArray.folder.push(folder)
  }

  if (!fs.existsSync(`${baseFile}${folder}/${folder}-${file}`)){
    fs.mkdirSync(`${baseFile}${folder}/${folder}-${file}`);
    if (!fs.existsSync(`${baseFile}${folder}/${folder}.twig`)){
      includeArray.file[folder].push(`${folder}-${file}`);
    }

  }

  if (!fs.existsSync(`${baseFile}${folder}/${folder}-${file}/${folder}-${file}.twig`)){
    fs.appendFile(`${baseFile}${folder}/${folder}-${file}/${folder}-${file}.twig`, '', function (err) {
      if (err) throw err;
      parseField(fields, {folder: folder, file: file } )
    });
  }

  if (!fs.existsSync(`${baseFile}${folder}/${folder}-${file}/_${folder}-${file}.scss`)){
    fs.appendFile(`${baseFile}${folder}/${folder}-${file}/_${folder}-${file}.scss`, '', function (err) {
      if (err) throw err;
    });
  }
}

function includePage() {
  includeArray.folder.forEach(element => {
    if (!fs.existsSync(`${baseFile}${element}/${element}.twig`)){
      fs.appendFile(`${baseFile}${element}/${element}.twig`, startfileBase, function (err) {
        if (err) throw err;
        startLoop()
      });

      const startLoop = async () => {
        await asyncForEach(includeArray.file[element], async (child) => {
          await waitFor(300);
          let stringToInclude = `  {% include 'views/pages/${element}/${child}/${child}.twig' %} ${os.EOL}`
          fs.appendFile(`${baseFile}${element}/${element}.twig`, stringToInclude, function (err) {
            if (err) throw err;
          });
        });
        fs.appendFile(`${baseFile}${element}/${element}.twig`, endfileBase, function (err) {
          if (err) throw err;
        });
      }
    }
  });
}

function parseField(field, folder ) {
  const fieldObj = field
  const folderObj = folder

  fieldObj.forEach(element => {
    const label = element.label
    const name = element.name
    const type = element.type

    let acfCall = '';
    let comment = '';
    let stringVar = '';

    if(type === 'repeater') {
      repaterField(name, element.sub_fields, folderObj, type)
    } else {
      if (type === 'image') {
        acfCall = imageField(name)
      } else if(type === 'relationship') {
        acfCall = relationField(name)
      } else {
        acfCall = basicField(name)
      }

      comment = `{# field name : ${element.label}, field type : ${element.type} #}${os.EOL}`
      stringVar = `${comment} ${acfCall} ${os.EOL}`
  
      writeFile(stringVar, folderObj)
    }

  });
}

function basicField(name) {
  return `{{ post.meta('${name}') }}`
}

function imageField(name) {
  return `{{ Image(post.meta('${name}')).src }}'`
}

function relationField(name) {
  const field = `
  {% for post in Post( post.meta('${name}')) %}
    {{ post.title }}
  {% endfor %}
  `
  return field
}

function repaterField(name, sub_fields, folderObj, type) {

  const startRepeat = `{% for item in post.meta('${name}') %}${os.EOL} ${os.EOL}`

  const endRepeat = `{% endfor %}${os.EOL}`

  let stackRepeat = ``
  let acfCall = '';
  let comment = '';
  let stringVar = '';

  const startLoop = async () => {
    await asyncForEach(sub_fields, async (child) => {
      await waitFor(50);
      if (child.type === 'image') {
        stackRepeat += `  {# field name : ${child.name}, field type : ${child.type} #}${os.EOL}`
        stackRepeat += `  ${imageField(child.name)} ${os.EOL} ${os.EOL}`
      } else {
        stackRepeat += `  {# field name : ${child.name}, field type : ${child.type} #}${os.EOL}`
        stackRepeat += `  ${basicField(child.name)} ${os.EOL} ${os.EOL}`
      }
    });
  
    acfCall = startRepeat + stackRepeat + endRepeat
    comment = `{# field name : ${name}, field type : ${type} #}${os.EOL}`
    stringVar = `${comment} ${acfCall} ${os.EOL}`

    writeFile(stringVar, folderObj)
  }
  startLoop()
}

function writeFile(stringToInclude, folder) {
  if (fs.existsSync(`${baseFile}${folder.folder}/${folder.folder}-${folder.file}/${folder.folder}-${folder.file}.twig`)){
    fs.appendFile(`${baseFile}${folder.folder}/${folder.folder}-${folder.file}/${folder.folder}-${folder.file}.twig`, stringToInclude + os.EOL, function (err) {
      if (err) throw err;
      console.log('Finish', folder.folder + '-' + folder.file);
    });
  }
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}


// data

const startfileBase = `
{% extends 'views/layout/base/base.twig' %}

{% block content %}
	<h2>{{post.title}}</h2>
`
const endfileBase = `
{% endblock %}
`