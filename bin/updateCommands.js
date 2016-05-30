var request = require('request');
var parser = require('xml2json');
var Promise = require('promise');
var fs = require('fs');


var ARDroneCommands = new Promise(function (resolve, reject) {
  request('https://raw.githubusercontent.com/Parrot-Developers/libARCommands/master/Xml/ARDrone3_commands.xml', function (err, res, xml) {
    resolve(parser.toJson(xml));
  })
})

var CommonCommands = new Promise(function (resolve, reject) {
  request('https://raw.githubusercontent.com/Parrot-Developers/libARCommands/master/Xml/common_commands.xml', function (err, res, xml) {
    resolve(parser.toJson(xml));
  })
})


Promise.all([ARDroneCommands, CommonCommands]).then(function (json) {
  
  var arr = json.map(function (json) {
    return JSON.parse(json).project;
  })
  
  fs.writeFile('./lib/commands.json', JSON.stringify(arr), function (err) {
    console.log(err);
  })
  
})

