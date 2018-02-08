// Generated by CoffeeScript 1.12.7
var JSONStream, jsonRequest, request, zlib;

request = require('request');

JSONStream = require('JSONStream');

zlib = require('zlib');

jsonRequest = function jsonSelect(jsonSelector, options) {
  var outStream;
  outStream = JSONStream.parse(jsonSelector);
  options.gzip = true;
  request(options).on('response', function(response) {
    var encoding, gunzip, ref;
    if (response.statusCode === 200) {
      encoding = (ref = response.headers['content-encoding']) != null ? ref.trim().toLowerCase() : void 0;
      if (encoding === 'gzip') {
        gunzip = zlib.createGunzip();
        return response.pipe(gunzip).pipe(outStream);
      } else {
        return response.pipe(outStream);
      }
    } else {
      return outStream.emit('error', "Instagram returned status code: " + response.statusCode);
    }
  });
  return outStream;
};

module.exports = {
  jsonRequest: jsonRequest
};
