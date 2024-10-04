#!/usr/bin/env node

import { exec } from "child_process";
import inquirer from "inquirer";
import fs from "fs";

const messages = {
  fr: {
    scriptQuestion: "Quel script voulez-vous exécuter ?",
    executing: "Exécution de la commande :",
    error: "Erreur lors de l'exécution :",
    noScripts: "Aucun script trouvé dans package.json",
    help: `
Usage: npm-helper [options]

Options:
  -h, --help       Affiche cette aide
  -v, --version    Affiche la version de l'outil

Description:
  Cet outil interactif vous permet de choisir et d'exécuter les scripts npm
  définis dans le fichier package.json.

Exemples:
  npm-helper          Lancer l'outil et choisir un script à exécuter
  npm-helper -h       Afficher l'aide
  npm-helper -v       Afficher la version de l'outil
  `,
  },
  en: {
    scriptQuestion: "Which script would you like to run?",
    executing: "Running command:",
    error: "Error during execution:",
    noScripts: "No scripts found in package.json",
    help: `
Usage: npm-helper [options]

Options:
  -h, --help       Display this help
  -v, --version    Display the tool version

Description:
  This interactive tool allows you to choose and run npm scripts
  defined in the package.json file.

Examples:
  npm-helper          Launch the tool and choose a script to run
  npm-helper -h       Display the help
  npm-helper -v       Display the tool
  `,
  },
};


const locale = Intl.DateTimeFormat().resolvedOptions().locale;
const isFrench = locale.startsWith("fr");

const currentMessages = isFrench ? messages.fr : messages.en;

function showHelp() {
  console.log(currentMessages.help);
}

const args = process.argv.slice(2);

if (args.includes("-h") || args.includes("--help")) {
  showHelp();
  process.exit(0);
}

if (args.includes("-v") || args.includes("--version")) {
  const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));
  console.log(`npm-helper version ${packageJson.version}`);
  process.exit(0);
}

const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));
const scripts = packageJson.scripts || {};

if (Object.keys(scripts).length === 0) {
  console.log(currentMessages.noScripts);
  process.exit(0);
}

inquirer
  .prompt([
    {
      type: "list",
      name: "script",
      message: currentMessages.scriptQuestion,
      choices: Object.keys(scripts),
    },
  ])
  .then((answers) => {
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
