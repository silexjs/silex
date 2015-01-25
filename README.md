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

Use CLI
--------

```bash
$ silex
------------------------
|   SilexJS commands   |
------------------------

Commands :
> create {PROJECT-NAME} [{PATH}]    Create the basic files to a new project *
> install [{PATH}]                  Installs a project (execute basic commands) *

* Command require "spaceload" package in global ("npm install -g spaceload")
```

This interface is temporary, it will soon be changed later...

Use CLI in project
--------

Lanch framework server :
```bash
$ node index.js
```

Lanch console :
```bash
$ node console.js
  Usage: undefined [options] [command]

  Commands:

    sequelize:db:toModels [options] [dir]  Create the models files from the database
    sequelize:db:migrate [dir]             Runs migration files
    sequelize:db:migrate:undo [dir]        Revert the last migration run

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```