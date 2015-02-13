Silex
=====

The Node (or io.js =) framework based on the Symfony 2.
The project is still in development, you can use but with risk of bugs.

Install
--------

```bash
$ npm install -g silex
$ npm install -g spaceload
```

Use CLI in a project
--------

```bash
$ silex

  (i) This console is NOT connected to Silex project

  Usage: silex [options] [command]


  Commands:

    project:create [options] <name> [dir]  Create basic files and installs the framework (see project:install)
    project:install [dir]                  Installs the framework (Dependencies and Nmespace)

  Options:

    -h, --help  output usage information

```

Use CLI outside of a project
--------

Lanch project :
```bash
$ node index.js
   _____ _ _               _  _____
  / ____(_) |             | |/ ____|
 | (___  _| | _____  __   | | (___
  \___ \| | |/ _ \ \/ /   | |\___ \
  ____) | | |  __/>  < |__| |____) |  v0.0.x
 |_____/|_|_|\___/_/\_\____/|_____/   development

Kernel: Bundle "SilexFrameworkBundle" loaded
Kernel: Bundle "SilexHttpServerBundle" loaded
Kernel: Bundle "SilexSequelizeBundle" loaded
Kernel: Bundle "SilexSwigBundle" loaded
Kernel: Bundle "SilexHttpStaticBundle" loaded
Kernel: Bundle "SilexMqapiBundle" loaded
...
```

To change the environment (check file "app/config/environments.json") :
```bash
$ node index.js -e testing
$ node index.js -e production
...
```
Otherwise, create an environment variable "NODE_ENV".

Lanch console :
```bash
$ silex

  (i) This console is connected to Silex project "test-silex"

  Usage: silex [options] [command]


  Commands:

    project:install [dir]                  Installs the framework (Dependencies and Nmespace)
    sequelize:db:toModels [options] [dir]  Create the models files from the database
    sequelize:db:migrate [dir]             Runs migration files
    sequelize:db:migrate:undo [dir]        Revert the last migration run

  Options:

    -h, --help  output usage information

```
