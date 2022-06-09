

const request = require('request');

const fs = require('fs');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const args = process.argv.slice(2);

const fetch = function (url, output, writeFile) {

  request(url, (error, response, body) => {

    if (error) {
      console.log("URL ERROR:");
      console.log('error:', error); // Print the error if one occurred
      return;
    }
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

    if (fs.existsSync(output)) {
      rl.question('File exist, Overwrite? Enter Y for yes ', (ans) => {
        if (ans !== 'Y') {
          console.log("Program ended.");
          return
        } else {
          writeFile(output, body);// Print the HTML for the Google homepage.
        }
      })
    } else {
      writeFile(output, body);
    }
  });

};

fetch(args[0], args[1], function (output, body) {
  fs.writeFile(output, body, err2 => {
    if (err2) {
      console.log(err2);
      return
    }
    let size = body.length;
    console.log(`Downloaded and saved ${size} bytes to ${output}`);
  });
});

