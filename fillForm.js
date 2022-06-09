const fs = require('fs');
const { createForm } = require('./src/form.js');
const { registerResponse } = require('./registerResponse.js');

const writeForm = (responses) => {
  fs.writeFileSync('details.json', JSON.stringify(responses), 'utf8');
  process.stdin.destroy();
};

const main = () => {
  const form = createForm();
  process.stdin.setEncoding('utf8');
  console.log(form.currentFieldPrompt());

  process.stdin.on('data', (chunk) => {
    const responses = chunk.trim().split('\n');
    responses.forEach(response => {
      registerResponse(form, response.trim(), writeForm, console.log)
    });
  });
};

main();
