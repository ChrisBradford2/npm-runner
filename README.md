# npm-helper

npm-helper is an interactive tool that helps you execute npm scripts defined in your `package.json` file with ease. It provides a user-friendly interface to select and run any available script.

## Installation

To install npm-helper globally, use the following command:

```sh
npm install -g npm-helper
```

## Usage

Once installed globally, you can run the tool from anywhere in your project directory:

```sh
npm-helper
```

You will be prompted to select a script from your `package.json` file.

### Command-Line Options

- `-h`, `--help`: Display help information about the available options.

  ```sh
  npm-helper -h
  ```

- `-v`, `--version`: Display the version of the npm-helper tool.

  ```sh
  npm-helper -v
  ```

## Example

1. Navigate to your project folder containing a `package.json` file.
2. Run:

   ```sh
   npm-helper
   ```

3. Select the script you want to execute from the interactive prompt.

## Features

- **Interactive Prompt**: Easily select and run any npm script from your project.
- **Multi-language Support**: The tool detects your system language and provides messages in English or French accordingly.

## Requirements

- Node.js (v14 or higher)
- npm

## Development

If you want to contribute to this project, clone the repository and install the dependencies:

```sh
git clone https://github.com/ChrisBradford2/npm-helper.git
cd npm-helper
npm install
```

To test the tool locally without installing globally:

```sh
node ./npm-runner.js
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to submit issues or pull requests for improvements and bug fixes. Contributions are always welcome!

## Author

- [Nicolas Barbarisi](https://github.com/ChrisBradford2)
