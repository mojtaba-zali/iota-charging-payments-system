//import '@babel/polyfill';
// Catch unhandled promise rejections
//require('./errorhandling');
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import * as Trytes from 'trytes';

function logBlue(message) {
  console.log('\x1b[36m%s\x1b[0m', message);
}

logBlue('Generating IOTA Seed from TPM RNG...\n\n');
sh("cat ~/keys/rnd32.txt").then(r => {
  console.log(r.stdout);
  const stdout = r.stdout;
  let randomNumber = [];

  for (let line of stdout.split(' ')) {
    randomNumber.push(line);
  }

  console.log(randomNumber);
  const trytes = Trytes.encodeBytesAsTryteString(randomNumber);
  console.log("trytes: " + trytes);
  const seed = trytes.substr(0, 81);
  console.log("seed: " + seed); // TODO: <-- REMOVE THIS LINE
  //const directory = __dirname + "/../";
  //const key = directory + "key.ctx";
  //const output = directory + "secret.enc";
  //const iv = directory + "iv.dat";
  // FOR TESTING: sh("echo " + seed + " | tpm2_encryptdecrypt -c " + key + " | tpm2_encryptdecrypt -c " + key + " -D " ).then( (r) => {

  /*sh("echo " + seed + " | tpm2_encryptdecrypt -c " + key + " -o " + output + " -t " + iv).then((r) => {
      console.log("Success");
  });*/

  sh("echo " + seed + " > seed.txt ").then(r => {
    console.log("Success");
  });
});
/**
 * Execute simple shell command (async wrapper).
 * @param {String} cmd
 * @return {Object} { stdout: String, stderr: String }
 */

async function sh(cmd) {
  return new Promise(function (resolve, reject) {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          stdout,
          stderr
        });
      }
    });
  });
}