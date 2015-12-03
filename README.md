# generator-nystudio107 

generator-nystudio107 is a [Yeoman](http://yeoman.io) generator for [Craft CMS](http://www.buildwithcraft.com) installs

Type just `yo nystudio107` and a new Craft CMS project install tailored to your liking will be created.

generator-nystudio107 is useful right out of the box, but it intended to be a skeleton framework upon which you can build your own generator that creates your ideal Craft CMS scaffolding for you.

## Installation

This assumes you have `nodejs`, `npm`, and `yeoman` installed already.

1. Download & unzip the file and place the `generator-nystudio107` directory onto your dev machine
2.  -OR- do a `git clone https://github.com/khalwat/generator-nystudio107.git` directly onto your dev machine.  You can then update it with `git pull`
3.  -OR- do an `npm install generator-nystudio107` to install it via npm
4. On the command line, from the root of the generator-nystudio107 project (in the `generator-nystudio107/` folder), type: `npm link` to install the project dependencies and symlink a global module.  On some setups, you may have to do `sudo npm link --no-bin-links`

## Usage

To create a new project and use generator-nystudio107 to scaffold it:

    mkdir your-project-name && cd your-project-name
    yo nystudio107

**NOTE: Craft is subject to licensing. This generator assumes you have read the terms of the Craft License Agreement, which are available [here](http://buildwithcraft.com/license)**

generator-nystudio107 will do the following for you:

1. Ask you for the name of your application (`appName`)
2. Download the lastest Craft CMS
3. Delete the default `craft/templates`, `craft/config/db.php`, and `craft/config/general.php`
4. Move the `public/htaccess` file to `public/.htaccess` so that Apache will read it
5. Create new `craft/config/db.php` and `craft/config/general.php` files with your `appName` filled in, and a multi-environment config for development & production.  The database user & db name are both set to `appName`
6. Create new `bower.json` and `package.json` files with your `appName` filled in, for use with Bower and NPM
7. Copy over `.csslintrc`, `.gitignore`, and `.jshintrc` files into your project
8. Copy over any folders of boilerplate files you want (base Craft CMS templates, base CSS, scripts, whatever)
9. Clone Craft CMS plugins that you use with your projects from Github
10. Set the permissions properly for your Craft CMS install; you might need to `chgrp -R WEBSERVER_GROUP` on the project folder, depending on your setup
11. [Optionally] create a bare remote `git` repository on your git server, create a local git repository, commit all of the files in your new local project to it, and push them to `origin master`
12. Run `bower install` and `npm install` on your project, so it's ready to go
13. Execute arbitrary shell commands when the install is finished

## Customizing generator-nystudio107

generator-nystudio107 is pretty useful out of the box, but the real bliss comes from tailoring it to your environment.  **Fork it** on GitHub, and make it your own.  To this end, open up the file `generator-nystudio107/app/index.js` file in your favorite editor.

You will see a number of configurable sections where you can tell generator-nystudio107 how to scaffold your projects.

### QUESTIONS

These are the questions that are asked prior to installation.  The variables set here are passed into your TEMPLATE_FILES in the form of `<%= name %>` for substitution in your templates, e.g.:

    "name": "<%= appName %>",

An additional variable `installDir` is also passed in automatically, e.g.:

    'basePath' => '/htdocs/<%= installDir %>/',

* `name:` the internal variable name (used for substitution)
* `message:` the human-readable message asked during prompting
* `default:` the default answer

By default, generator-nystudio107 just asks for the `appName` but you can add whatever additional template variables you find useful.

### DOWNLOAD_FILES

A list of arbitrary file URLs to download and extract

* `name:` The human-readable name of the download file
* `url:` the url to the file to be downloaded and extracted

By default, generator-nystudio107 just downloads the latest Craft CMS, but if you have other things you want downloaded, you can add them here.

### DELETE_FILES

Files or directories that should be deleted after the download

* `src:` the source path for the file, relative to the project directory

By default, generator-nystudio107 deletes the default `craft/templates`, `craft/config/db.php`, and `craft/config/general.php` but if you have other things you want deleted, you can add them here.

### MOVE_FILES

Files that should be moved (renamed) after the download

* `src:` the source path of the file, relative to the project directory
* `dest:` the destination path of the file, relative to the project directory

By default, generator-nystudio107 just moves the `public/htaccess` file to `public/.htaccess`, but you can add any other files that you want moved/renamed here.

### TEMPLATE_FILES

Files that are parsed as templates with the 'answers' context, to allow for variable substitution while copying them from `src:` to `dest:`

src: the source path for the file, relative to the 'templates' directory
dest: the destination path for the file, relative to the project directory

By default, generator-nystudio107 just creates new `craft/config/db.php`, `craft/config/general.php`, `bower.json` and `package.json` files with your `appName` filled in, but you can add any additional files you want parsed as templates here.

### BOILERPLATE_FILES

Individual files that we copy wholesale from 'templates' to the destination; we do it this way so we can optionally rename the files on copy

* `src:` the source path of the file, relative to the 'templates' directory
* `dest:` the destination path of the file, relative to the project directory

By default, generator-nystudio107 just copies over `.csslintrc`, `.gitignore`, and `.jshintrc` into the root of your project, but you can add any additional files you want copied here.

### BOILERPLATE_DIRECTORIES

Directories that we copy wholesale from 'templates' to the destination

* `src:` the source path of the directory, relative to the 'templates' directory
* `dest:` the destination path of the directory, relative to the project directory

By default, generator-nystudio107 just copies over some dummy `craft/templates` to show you how you can do it for your own base Craft CMS templates.

### CRAFT_PLUGINS

Craft CMS plugins downloaded from git repositories on github.com

* `name:` The human-readable name of the plugin
* `url:` the git clone URL for the plugin
* `path:` the destination path, relative to the project directory

By default, generator-nystudio107 just clones my `Minify`, `Cookies`, and `Path Tools` plugins, but you can change these, or add any plugins you want cloned here.

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

By default, generator-nystudio107 doesn't execute any commands at the [ End ] phase, but you can add any that you'd like executed here.

### Sample Output

Here's an example of the output from a `yo nystudio107` generator:

```
vagrant@homestead:~/sites/testapp101$ yo nystudio107
[ Initializing ]
[ Prompting ]
? Application name testapp
[ Configuring ]
{ appName: 'testapp',
  installDir: 'testapp101',
  templatesDir: 'templates' }
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

## Changelog

### 1.0.0 -- 2015.11.29

* Initial release
