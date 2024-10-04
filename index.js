#!/usr/bin/env node

import { exec } from 'child_process';
import inquirer from 'inquirer';
import fs from 'fs'

const locale = Intl.DateTimeFormat().resolvedOptions().locale;
const isFrench = locale.startsWith('fr');

const messages = {
  fr: {
    scriptQuestion: 'Quel script voulez-vous exécuter ?',
    executing: 'Exécution de la commande :',
    error: 'Erreur lors de l\'exécution :'
  },
  en: {
    scriptQuestion: 'Which script would you like to run?',
    executing: 'Running command:',
    error: 'Error during execution:'
  }
};

const currentMessages = isFrench ? messages.fr : messages.en;

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const scripts = packageJson.scripts || {};

inquirer.prompt([
  {
    type: 'list',
    name: 'script',
    message: currentMessages.scriptQuestion,
    choices: Object.keys(scripts),
  }
]).then(answers => {
  const command = `npm run ${answers.script}`;
  console.log(`${currentMessages.executing} ${command}`);

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`${currentMessages.error} ${err}`);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  });
});
