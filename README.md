# SCAFFOLD-APP - app scaffold cli

[GITHUB](https://github.com/Goldenhub/scaffolda)

## Description

This is a cli tool for scaffolding a new app.

## Usage

```bash
npm install -g scaffold-app
scaffold-app create <option> <APPNAME>
```

## Options

```bash
$ scaffold-app --help

  Usage: scaffold-app <command> [options] <APP NAME>

  Options:

    -V, --version  output the version number
    -h, --help     output usage information
    --web          create a basic web application directory structure
    --bootstrap    adds the latest bootstrap cdn to the index file (--web option must be present)
    --test         scaffolds with a test/app.spec.js file (--web option must be present)
  
  Commands:
      create [options] <APP NAME>  scaffold a new app
      

```

## Dependencies

- commander
- chalk
- fs

## Author

[Github](https://github.com/goldenhub) <br>
[Linkedin](https://linkedin.com/goldenazubuike) <br>
[Twitter](https://twitter.com/chibu_exe)

## License

MIT
