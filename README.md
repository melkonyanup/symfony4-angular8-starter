Symphony 4 + Angular 8 : Starter Project
========================

Requirements
------------

  * PHP 7.1.3 or higher;
  * PDO-SQLite PHP extension enabled;
  * intl PHP extension enabled;
  * and the [usual Symfony application requirements][2].

Install the symfony project
-----

### Go Inside the project
```bash
$ cd backend
```
### Install composer dependencies
```bash
$ composer install
```

### Install Angular npm dependencies
```bash
$ cd frontend
$ npm install
```

### Generate database (Important !!!!!!) => use only the folowing commands
```bash
$ php bin/console doctrine:database:create
$ php bin/console doctrine:migrations:migrate
```
Then import the data from json file in the database
```bash
$ php bin/console json:import-orders
```

Launch the Symfony project
-----

There's no need to configure anything to run the application. If you have
installed the [Symfony client][4] binary, run this command to run the built-in
web server and access the application in your browser at <http://localhost:8000>:

```bash
$ symfony serve
```

If you don't have the Symfony client installed, run `php bin/console server:run`.
Alternatively, you can [configure a web server][3] like Nginx or Apache to run
the application.

Launch the Angular project
-----

There's no need to configure anything to run the application. If you have
installed the Angular Cli, run this command to run the built-in
web server and access the application in your browser at <http://localhost:4200>:

```bash
$ ng serve
```

If you don't have the  Angular Cli installed, run `npm install -g @angular/cli`.
