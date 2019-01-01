[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

# DEPRECATED

This package is no longer supported, but it is fully functional, and you may continue to use it as you see fit. The license also allows you to fork it and make changes as needed for legacy support reasons.

# generator-craftinstall 

generator-craftinstall is a [Yeoman](http://yeoman.io) generator for [Craft CMS](http://www.buildwithcraft.com) installs

Type just `yo craftinstall` and a new Craft CMS project install tailored to your liking will be created.

generator-craftinstall is useful right out of the box, but it intended to be a framework upon which you can build your own install configuration that creates your ideal Craft CMS scaffolding.

## Installation

This assumes you have `nodejs`, `npm`, and `yeoman` installed already.

1. Download & unzip the file and place the `generator-craftinstall` directory onto your dev machine
2.  -OR- do a `git clone https://github.com/nystudio107/generator-craftinstall.git` directly onto your dev machine.  You can then update it with `git pull`
3. On the command line, from the root of the generator-craftinstall project (in the `generator-craftinstall/` folder), type: `npm link` to install the project dependencies and symlink a global module.  On some setups, you may have to do `sudo npm link --no-bin-links`
4.  -OR- do an `npm -g install generator-craftinstall` to install it via npm (and thus skip the `npm link` step)
5. The generator folder should be named `generator-craftinstall`.  GitHub recently started appending `-master` (the branch name) to the name of the folder for zip file downloads.

Requires Node version 4.0.0 or later.

## Usage

To create a new project and use generator-craftinstall to scaffold it:

    yo craftinstall

generator-craftinstall will prompt you to choose from a list of `installs` that define various Craft CMS environments.  You can use the two that are included by default, but the real power comes when you create your own (see below).

**NOTE: Craft is subject to licensing. This generator assumes you have read the terms of the Craft License Agreement, which are available [here](http://buildwithcraft.com/license)**

generator-craftinstall will do the following for you:

1. Ask you which `install` to use for this Craft CMS install; `installs` are a combination of settings and files used to scaffold your Craft CMS install
2. Ask you for the name of your application (`appName`)
3. Download the lastest Craft CMS
4. Delete the default `craft/templates`, `craft/config/db.php`, and `craft/config/general.php`
5. Move the `public/htaccess` file to `public/.htaccess` so that Apache will read it
6. Create new `craft/config/db.php` and `craft/config/general.php` files with your `appName` filled in, and a multi-environment config for development & production.  The database user & db name are both set to `appName`
7. Create new `bower.json` and `package.json` files with your `appName` filled in, for use with Bower and NPM
8. Copy over `.csslintrc`, `.gitignore`, and `.jshintrc` files into your project
9. Copy over any folders of boilerplate files you want (base Craft CMS templates, base CSS, scripts, whatever)
10. [Optionally] pipe a MySQL database dump into your newly installed database
11. Clone Craft CMS plugins that you use with your projects from Github
12. Set the permissions properly for your Craft CMS install; you might need to `chgrp -R WEBSERVER_GROUP` on the project folder, depending on your setup
13. [Optionally] create a bare remote `git` repository on your git server, create a local git repository, commit all of the files in your new local project to it, and push them to `origin master`
14. Run `bower install` and `npm install` on your project, so it's ready to go
15. Execute arbitrary shell commands when the install is finished

## Customizing generator-craftinstall

generator-craftinstall is pretty useful out of the box, but the real bliss comes from tailoring it to your environment.  To do this, look in the `app/templates` and you'll see two example `installs`:

* **advanced_craft_install.json** - an "advanced" install that does things like download plugins, set up a `package.json` file for NPM, set up a `bower.json` file for Bower, etc.
* **basic_craft_install.json** - just downloads Craft, and does a little cleanup for you, removing the default templates, and setting up a nice multi-environment config

Open up either one of them, and you will see a number of configurable sections where you can tell generator-craftinstall how to scaffold your projects.  There is a corresponding folder that contains the template files (referred to hereinafter as `templates` folder), and the `.json` file that refers to it.

The easiest thing to do is make a copy of one of the prefab configs, and modify it to your liking.  The nice thing about this type of configuration is you can zip up your `.json` file and your templates folder, and other people can use your `yo craftinstall` setup too.

### Basic Settings

* **INSTALL_NAME** - The human readable name of the install, and what is shown in the install selector when you run `yo craftinstall`
* **INSTALL_KEY** - The name of the folder in the `app/templates` directory that contains your various template and settings files.  This can be named whatever you want, but it's nice to have it match the name of your `.json` file.

### QUESTIONS

These are the questions that are asked prior to installation.  The variables set here are passed into your TEMPLATE_FILES in the form of `<%= name %>` for substitution in your templates, e.g.:

    "name": "<%= appName %>",

An additional variable `installDir` is also passed in automatically, e.g.:

    'basePath' => '/htdocs/<%= installDir %>/',

* `name:` the internal variable name (used for substitution)
* `message:` the human-readable message asked during prompting
* `default:` the default answer

By default, generator-craftinstall just asks for the `appName` but you can add whatever additional template variables you find useful.  [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/) is used to ask the questions, so you can use any of the available Prompt Types that Inquirer.js supports.

### DOWNLOAD_FILES

A list of arbitrary file URLs to download and extract

* `name:` The human-readable name of the download file
* `url:` the url to the file to be downloaded and extracted

By default, generator-craftinstall just downloads the latest Craft CMS, but if you have other things you want downloaded, you can add them here.

### DELETE_FILES

Files or directories that should be deleted after the download

* `src:` the source path for the file, relative to the project directory

By default, generator-craftinstall deletes the default `craft/templates`, `craft/config/db.php`, and `craft/config/general.php` but if you have other things you want deleted, you can add them here.

### MOVE_FILES

Files that should be moved (renamed) after the download

* `src:` the source path of the file, relative to the project directory
* `dest:` the destination path of the file, relative to the project directory

By default, generator-craftinstall just moves the `public/htaccess` file to `public/.htaccess`, but you can add any other files that you want moved/renamed here.

### TEMPLATE_FILES

Files that are parsed as templates with the 'answers' context, to allow for variable substitution while copying them from `src:` to `dest:`

* `src:` the source path for the file, relative to the 'templates' directory
* `dest:` the destination path for the file, relative to the project directory

Yeoman uses [EJS](http://ejs.co) for the templating language, so you can use any expressions that EJS supports in your templates.

By default, generator-craftinstall just creates new `craft/config/db.php`, `craft/config/general.php`, `bower.json` and `package.json` files with your `appName` filled in, but you can add any additional files you want parsed as templates here.

### BOILERPLATE_FILES

Individual files that we copy wholesale from 'templates' to the destination; we do it this way so we can optionally rename the files on copy

* `src:` the source path of the file, relative to the 'templates' directory
* `dest:` the destination path of the file, relative to the project directory

By default, generator-craftinstall just copies over `.csslintrc`, `.gitignore`, and `.jshintrc` into the root of your project, but you can add any additional files you want copied here.

### BOILERPLATE_DIRECTORIES

Directories that we copy wholesale from 'templates' to the destination

* `src:` the source path of the directory, relative to the 'templates' directory
* `dest:` the destination path of the directory, relative to the project directory

By default, generator-craftinstall just copies over some dummy `craft/templates` to show you how you can do it for your own base Craft CMS templates.

### MYSQL_DBS

A MySQL database dump that we pipe into your new Craft CMS install's database.  Here's an example:

    "MYSQL_DBS": [
        {
            "user": "homestead",
            "password": "secret",
            "src": "craft/db/dump.sql"
        }
    ],
 

* `user:` the user name to use to connect to MySQL
* `password:` the password to use to connect to MySQL
* `src:` the path to the `mysqldump` for your database

You can set up a default Craft install, add whatever users/fields/sections/whatever that you used as a base, then dump the database by choosing **Settings->Backup Database**.  Then when you run `yo craftinstall` the database will be there waiting for you.


By default, generator-craftinstall does not dump a database.

### CRAFT_PLUGINS

Craft CMS plugins downloaded from git repositories on github.com

* `name:` The human-readable name of the plugin
* `url:` the git clone URL for the plugin
* `path:` the destination path, relative to the project directory

By default, generator-craftinstall just clones my `Minify`, `Cookies`, and `Path Tools` plugins, but you can change these, or add any plugins you want cloned here.

### REMOTE_GIT_ORIGIN

This is the remote git server you use, in the form of user@domain.com  If you don't use a git server, you can just leave this as an empty string, e.g.: `''`, to skip the git-related steps.  See: [How To Set Up a Private Git Server on a VPS](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-private-git-server-on-a-vps)

If this is set to a `user@domain.com`, the following steps happen:

1. `ssh` to your `REMOTE_GIT_ORIGIN` and execute a `git init --bare` for your `appName`
2. Locally, `git init` && `git remote add origin`, then it add all of your `CRAFT_PLUGINS` as submodules (see below)
3. Locally, `git add -A` && `git commit -m "initial commit"` && `git push origin master`

Because your `CRAFT_PLUGINS` are added as submodules, when you want to `git clone` your repo, you should do: `git clone --recursive` to have it also clone the submodules.

If you want to update the submodules in your repo, do `git submodule foreach git pull origin master` and it'll update all of your submodules for you.

### END_INSTALL_COMMANDS

A list of arbitrary shell commands to execute in sequence at the [ End ] phase of the generator

* `name:` The human-readable name of the command
* `command:` the shell command to be executed

By default, generator-craftinstall doesn't execute any commands at the [ End ] phase, but you can add any that you'd like executed here.

### Sample Output

Here's an example of the output from a `yo craftinstall` generator:

```
vagrant@homestead:~/sites/testapp101$ yo craftinstall
[ Initializing ]
? Select which install to use: (Use arrow keys)
❯ Advanced Craft Install 
  Basic Craft Install 
[ Prompting ]
? Application name testapp
[ Configuring ]
{ appName: 'testapp',
  installDir: 'test',
  templatesDir: 'templates/advanced_craft_install' }
+ Creating Craft install folder testapp
> Downloading files
+ Craft CMS downloading
  4385 files download and extracted successfully;)
[ Writing ]
> Deleting files
+ Directory craft/templates deleted
+ File craft/config/db.php deleted
+ File craft/config/general.php deleted
> Moving files
+ public/htaccess moved to public/.htaccess
> Writing template files
+ templates/_bower.json wrote to bower.json
+ templates/_package.json wrote to package.json
+ templates/craft/config/_db.php wrote to craft/config/db.php
+ templates/craft/config/_general.php wrote to craft/config/general.php
+ templates/scripts/_pull-db-from-prod.sh wrote to scripts/pull-db-from-prod.sh
+ templates/scripts/_push-dev-to-git.sh wrote to scripts/push-dev-to-git.sh
+ templates/scripts/_push-dev-to-prod.sh wrote to scripts/push-dev-to-prod.sh
> Copying boilerplate files
+ templates/_csslintrc copied to .csslintrc
+ templates/_gitignore copied to .gitignore
+ templates/_jshintrc copied to .jshintrc
+ templates/_Gruntfile.js copied to Gruntfile.js
> Copying boilerplate directories
+ templates/craft/templates copied to craft/templates
+ templates/css_src copied to css_src
+ templates/js_src copied to js_src
+ templates/json_src copied to json_src
+ templates/img_src copied to img_src
+ templates/fontello_src copied to fontello_src
> Copying boilerplate directories
+ templates/advanced_craft_install/craft/templates copied to craft/templates
> Mysql database restore
> Cloning base Craft plugins
+ Minify plugin installed
Cloning into 'craft/plugins/minify'...
+ Cookies plugin installed
Cloning into 'craft/plugins/cookies'...
+ Path Tools plugin installed
Cloning into 'craft/plugins/pathtools'...
> Sync to file system
   create bower.json
   create package.json
   create craft/config/db.php
   create craft/config/general.php
   create scripts/pull-db-from-prod.sh
   create scripts/push-dev-to-git.sh
   create scripts/push-dev-to-prod.sh
   create .csslintrc
   create .gitignore
   create .jshintrc
   create Gruntfile.js
[ Install ]
> Creating craft/storage directory
> Setting global permissions to 755
> Setting permissions on craft/app/ to 775
> Setting permissions on craft/config/ to 775
> Setting permissions on craft/storage to 775
> Creating bare remote git repository
> Initializing local git repository
+ Minify added as submodule
+ Cookies added as submodule
+ Path Tools added as submodule
> Adding project files to git repository
> Doing initial commit to git repository
> Pushing git repository to origin master
To git@tastystakes.com:testapp.git
 * [new branch]      master -> master
> Bower Install
> NPM Install
[ End ]
> End install commands
+ animate.css npm install executed
> All set.  Have a nice day.
vagrant@homestead:~/sites/testapp101$ 
```

## Debugging

If you receive an error that looks like this when doing `yo craftinstall`:

```
[ Initializing ]
events.js:141
      throw er; // Unhandled 'error' event
      ^

SyntaxError: Unexpected token ]
    at Object.parse (native)
    at /home/vagrant/webdev/craft/public/generator-craftinstall/app/index.js:86:36
    at Array.forEach (native)
    at module.exports.yo.generators.Base.extend.initializing (/home/vagrant/webdev/craft/public/generator-craftinstall/app/index.js:80:37)
    at /home/vagrant/webdev/craft/public/generator-craftinstall/node_modules/yeoman-generator/lib/base.js:429:16
    at processImmediate [as _immediateCallback] (timers.js:371:17)
```

...this means there is an error in your JSON file.  Validate your JSON with [jsonlint.com](http://jsonlint.com)

## Changelog

### 1.1.3 -- 2016.05.05

* [Fixed] Rewrote the download system to be synchronous
* [Improved] Updated README.md

### 1.1.2 -- 2016.05.05

* [Fixed] Fixed an issue with multiple files being downloaded in `DOWNLOAD_FILES` thanks to @wbrowar
* [Improved] Updated README.md

### 1.1.1 -- 2016.05.02

* [Improved] Cleaned up the documentation a good bit
* [Fixed] Removed the MYSQL_DBS from the `advanced_craft_install.json`
* [Improved] Updated README.md

### 1.1.0 -- 2016.05.02

* [Added] Added the ability to create as many install configs as you like
* [Added] Renamed it `generator-craftinstall` (was: generator-nystudio107)
* [Improved] Updated README.md

### 1.0.0 -- 2015.11.29

* [Added] Initial release
