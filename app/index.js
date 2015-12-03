/* --------------------------------------------------------------------------------
    GENERATOR-NYSTUDIO107
    generator-nystudio107 is a Yeoman generator for Craft CMS installs

    Type just `yo nystudio107` and a new Craft CMS project install tailored to
    your liking will be created.
-------------------------------------------------------------------------------- */

'use strict';

/* --------------------------------------------------------------------------------
    *** Being configuration section ***
-------------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------------
    QUESITONS
    These are the questions that are asked prior to installation.  The variables
    set here are passed into your TEMPLATE_FILES in the form of <%= name %> for
    substitution in your templates, e.g.:

        "name": "<%= appName %>",

    An additional variable 'installDir' is also passed in automatically, e.g.:

        'basePath' => '/htdocs/<%= installDir %>/',

       name: the internal variable name (used for substitution)
    message: the human-readable message asked during prompting
    default: the default answer

    By default, generator-nystudio107 just asks for the `appName` but you can add
    whatever additional template variables you find useful.
-------------------------------------------------------------------------------- */

const QUESTIONS = [
    {
        name: 'appName',
        message: 'Application name',
        default: 'testapp'
    },
];

/* --------------------------------------------------------------------------------
    DOWNLOAD_FILES
    A list of arbitrary file URLs to download and extract

    name: The human-readable name of the download file
     url: the url to the file to be downloaded and extracted

    By default, generator-nystudio107 just downloads the latest Craft CMS, but if
    you have other things you want downloaded, you can add them here.
-------------------------------------------------------------------------------- */

const DOWNLOAD_FILES = [
    {
        name: "Craft CMS",
        url: "http://buildwithcraft.com/latest.zip?accept_license=yes"
    },
];

/* --------------------------------------------------------------------------------
    DELETE_FILES
    Files or directories that should be deleted after the download

     src: the source path for the file, relative to the project directory

    By default, generator-nystudio107 deletes the default `craft/templates`,
    `craft/config/db.php`, and `craft/config/general.php` but if you have other
    things you want deleted, you can add them here.
-------------------------------------------------------------------------------- */

const DELETE_FILES = [
    {
        src: "craft/templates",
    },
    {
        src: "craft/config/db.php",
    },
    {
        src: "craft/config/general.php",
    },
];

/* --------------------------------------------------------------------------------
    MOVE_FILES
    Files that should be moved (renamed) after the download

     src: the source path of the file, relative to the project directory
    dest: the destination path of the file, relative to the project directory

    By default, generator-nystudio107 just moves the `public/htaccess` file to
    `public/.htaccess`, but you can add any other files that you want
    moved/renamed here.
-------------------------------------------------------------------------------- */

const MOVE_FILES = [
    {
        src: "public/htaccess",
        dest: "public/.htaccess"
    },
];

/* --------------------------------------------------------------------------------
    TEMPLATE_FILES
    Files that are parsed as templates with the 'answers' context, to allow for
    variable substitution while copying them from `src:` to `dest:`

     src: the source path for the file, relative to the 'templates' directory
    dest: the destination path for the file, relative to the project directory

    By default, generator-nystudio107 just creates new `craft/config/db.php`,
    `craft/config/general.php`, `bower.json` and `package.json` files with your
    `appName` filled in, but you can add any additional files you want parsed as
    templates here.
-------------------------------------------------------------------------------- */

const TEMPLATE_FILES = [
    {
        src: "_bower.json",
        dest: "bower.json"
    },
    {
        src: "_package.json",
        dest: "package.json"
    },
    {
        src: "craft/config/_db.php",
        dest: "craft/config/db.php"
    },
    {
        src: "craft/config/_general.php",
        dest: "craft/config/general.php"
    },
];

/* --------------------------------------------------------------------------------
    BOILERPLATE_FILES
    Individual files that we copy wholesale from 'templates' to the destination;
    we do it this way so we can optionally rename the files on copy

     src: the source path of the file, relative to the 'templates' directory
    dest: the destination path of the file, relative to the project directory

    By default, generator-nystudio107 just copies over `.csslintrc`, `.gitignore`,
    and `.jshintrc` into the root of your project, but you can add any additional
    files you want copied here.
-------------------------------------------------------------------------------- */

const BOILERPLATE_FILES = [
    {
        src: "_csslintrc",
        dest: ".csslintrc"
    },
    {
        src: "_gitignore",
        dest: ".gitignore"
    },
    {
        src: "_jshintrc",
        dest: ".jshintrc"
    },
    {
        src: "craft/storage/_gitignore",
        dest: "craft/storage/.gitignore"
    },
];

/* --------------------------------------------------------------------------------
    BOILERPLATE_DIRECTORIES
    Directories that we copy wholesale from 'templates' to the destination

     src: the source path of the directory, relative to the 'templates' directory
    dest: the destination path of the directory, relative to the project directory

    By default, generator-nystudio107 just copies over some dummy `craft/templates`
    to show you how you can do it for your own base Craft CMS templates.
-------------------------------------------------------------------------------- */

const BOILERPLATE_DIRECTORIES = [
    {
        src: "craft/templates",
        dest: "craft/templates"
    },
];

/* --------------------------------------------------------------------------------
    CRAFT_PLUGINS
    Craft CMS plugins downloaded from git repositories on github.com

    name: The human-readable name of the plugin
     url: the git clone URL for the plugin
    path: the destination path, relative to the project directory

    By default, generator-nystudio107 just clones my `Minify`, `Cookies`, and
    `Path Tools` plugins, but you can change these, or add any plugins you want
    cloned here.
-------------------------------------------------------------------------------- */

const CRAFT_PLUGINS = [
    {
        name: "Minify",
        url: "https://github.com/khalwat/minify.git",
        path: "craft/plugins/minify"
    },
    {
        name: "Cookies",
        url: "https://github.com/khalwat/cookies.git",
        path: "craft/plugins/cookies"
    },
    {
        name: "Path Tools",
        url: "https://github.com/khalwat/pathtools.git",
        path: "craft/plugins/pathtools"
    },
];

/* --------------------------------------------------------------------------------
    REMOTE_GIT_ORIGIN
    This is the remote git server you use, in the form of user@domain.com
    If you don't use a git server, you can just leave this as an empty string,
    e.g.: '', to skip the git-related steps
-------------------------------------------------------------------------------- */

const REMOTE_GIT_ORIGIN = '';

/* --------------------------------------------------------------------------------
    BOWER_OPTIONS
    Options passed along to bowerInstall();
-------------------------------------------------------------------------------- */

const BOWER_OPTIONS = [
];

/* --------------------------------------------------------------------------------
    NPM_OPTIONS
    Options passed along to npmInstall();
-------------------------------------------------------------------------------- */

const NPM_OPTIONS = [
    '--no-bin-links',
];

/* --------------------------------------------------------------------------------
    END_INSTALL_COMMANDS
    A list of arbitrary shell commands to execute in sequence at the [ End ] phase
    of the generator

       name: The human-readable name of the command
    command: the shell command to be executed

    By default, generator-nystudio107 doesn't execute any commands at the [ End ]
    phase, but you can add any that you'd like executed here.
-------------------------------------------------------------------------------- */

const END_INSTALL_COMMANDS = [
    {
        name: "Fin.",
        command: "echo 'Fin.'"
    },
];

/* --------------------------------------------------------------------------------
    *** End configuration section ***
-------------------------------------------------------------------------------- */

var yo              = require('yeoman-generator');
var chalk           = require('chalk');
var download        = require('download');
var pleasant        = require('pleasant-progress');
var fs              = require('fs');
var ncp             = require('ncp');
var child_process   = require('child_process');
var path            = require('path');

module.exports = yo.generators.Base.extend({
    
/* -- initializing --  Your initialization methods (checking current project state, getting configs, etc) */

    initializing: function() {
        console.log(chalk.yellow.bold('[ Initializing ]'));
        
        this.answers = {};
        
        this.download = function(url, cb) {
            var self = this;
            new download({mode: '775', extract: true})
                .get(url)
                .dest(this.destinationPath())
                .run(function(error, files) {
                    if (error) {
                        console.log(error);
                        process.exit();
                    } else {
                        cb();
                        console.log('  ' + chalk.green(files.length) + ' files download and extracted successfully;)');
                    }
                });
            };
        },

/* -- prompting -- Where you prompt users for options (where you'd call this.prompt()) */

    prompting: function() {
        console.log(chalk.yellow.bold('[ Prompting ]'));

        var done = this.async();

/* -- Ask them the name they want for this app */

        this.prompt(QUESTIONS, function(answers) {
                this.answers = answers;
                var installDirPath = path.dirname(path.normalize(this.destinationPath('package.json')));
                this.answers.installDir = installDirPath.match(/([^\/]*)\/*$/)[1];
                this.answers.templatesDir = 'templates';
                done();
            }.bind(this));;
        },
        
/* -- configuring -- Saving configurations and configure the project (creating .editorconfig files and other metadata files) */

    configuring: function() {
        console.log(chalk.yellow.bold('[ Configuring ]'));
        console.log(this.answers);

/* -- Download files */

        console.log(chalk.green('> Downloading files'));
        for (var i = 0; i < DOWNLOAD_FILES.length; i++) {
            var done = this.async();
            var download = DOWNLOAD_FILES[i];
            console.log('+ ' + chalk.green(download.name) + ' downloading');
            var progress = new pleasant();
            progress.start('Working');
            this.download(download.url, function() {
                progress.stop();
                done();
                });
            }

        },
        
/* -- writing -- Where you write the generator specific files (routes, controllers, etc) */

    writing: function() {
        console.log(chalk.yellow.bold('[ Writing ]'));
    
/* -- Delete the templates directory */

        var deleteFolderRecursive = function(path) {
            if (fs.existsSync(path)) {
                fs.readdirSync(path).forEach(function(file, index) {
                    var curPath = path + "/" + file;
                    if (fs.statSync(curPath).isDirectory()) {
                        deleteFolderRecursive(curPath);
                    } else { 
                        fs.unlinkSync(curPath);
                    }
                });
                fs.rmdirSync(path);
            }
        };

/* -- Delete files */

        console.log(chalk.green('> Deleting files'));
        for (var i = 0; i < DELETE_FILES.length; i++) {
            var file = DELETE_FILES[i];
            if (fs.existsSync(file.src) ) {
                if (fs.statSync(file.src).isDirectory()) {
                    console.log('+ Directory ' + chalk.green(file.src) + " deleted");
                    deleteFolderRecursive(file.src);
                } else { 
                    console.log('+ File ' + chalk.green(file.src) + " deleted");
                    fs.unlinkSync(file.src);
                }
            }
        }

/* -- Move files */

        console.log(chalk.green('> Moving files'));
        for (var i = 0; i < MOVE_FILES.length; i++) {
            var file = MOVE_FILES[i];
            console.log('+ ' + file.src + ' moved to ' + chalk.green(file.dest));
            fs.renameSync(file.src,
                file.dest
                );
        }

/* -- Write template files */

        console.log(chalk.green('> Writing template files'));
        for (var i = 0; i < TEMPLATE_FILES.length; i++) {
            var file = TEMPLATE_FILES[i];
            console.log('+ ' + this.answers.templatesDir + "/" + file.src + ' wrote to ' + chalk.green(file.dest));
            this.fs.copyTpl(
                this.templatePath(file.src),
                this.destinationPath(file.dest),
                this.answers
            );
        }

/* -- Copy boilerplate files */

        console.log(chalk.green('> Copying boilerplate files'));
        for (var i = 0; i < BOILERPLATE_FILES.length; i++) {
            var file = BOILERPLATE_FILES[i];
            console.log('+ ' + this.answers.templatesDir + "/" + file.src + ' copied to ' + chalk.green(file.dest));
            this.fs.copy(
                this.templatePath(file.src),
                this.destinationPath(file.dest)
            );
        }

/* -- Copy boilerplate directories */

        console.log(chalk.green('> Copying boilerplate directories'));
        for (var i = 0; i < BOILERPLATE_DIRECTORIES.length; i++) {
            var dir = BOILERPLATE_DIRECTORIES[i];
            console.log('+ ' + this.answers.templatesDir + "/" + dir.src + ' copied to ' + chalk.green(dir.dest));
            ncp(this.templatePath(dir.src), this.destinationPath(dir.dest), function (err) {
                if (err) {
                    return console.error(err);
                }
            });
        }

/* -- Craft base plugins */

        console.log(chalk.green('> Cloning base Craft plugins'));
        for (var i = 0; i < CRAFT_PLUGINS.length; i++) {
            var plugin = CRAFT_PLUGINS[i];
            console.log('+ ' + chalk.green(plugin.name) + ' plugin installed');
            child_process.execSync('git clone ' + plugin.url + ' ' + plugin.path);
        }

        console.log(chalk.green('> Sync to file system'));
        },
        
/* -- install -- Where installation are run (npm, bower) */

    install: function() {
        console.log(chalk.yellow.bold('[ Install ]'));

/* -- Set permissions on the entire Craft install tree */

        console.log(chalk.green('> Setting global permissions to 755 / 644'));
        child_process.execSync('chmod -R 755 *');
        child_process.execSync('find . -type f -exec chmod 644 {} \\;');
        console.log(chalk.green('> Setting permissions on craft/app to 775 / 644'));
        child_process.execSync('chmod -R 775 craft/app');
        child_process.execSync('find craft/app/ -type f -exec chmod 664 {} \\;');
        console.log(chalk.green('> Setting permissions on craft/config to 775 / 644'));
        child_process.execSync('chmod -R 775 craft/config');
        child_process.execSync('find craft/config/ -type f -exec chmod 664 {} \\;');
        console.log(chalk.green('> Setting permissions on craft/storage to 775 / 644'));
        child_process.execSync('chmod -R 775 craft/storage');
        child_process.execSync('find craft/storage/ -type f -exec chmod 664 {} \\;');

/* -- Create a bare remote git repository */

        if (REMOTE_GIT_ORIGIN) {
            console.log(chalk.green('> Creating bare remote git repository'));
            child_process.execSync("ssh " + REMOTE_GIT_ORIGIN + " 'git init --bare " + this.answers['appName'] + ".git'");
    
/* -- Initialize the local git directory, add all of the files, commit them, and push them to origin master */
    
            console.log(chalk.green('> Initializing local git repository'));
            child_process.execSync('git init');
            child_process.execSync('git remote add origin ' + REMOTE_GIT_ORIGIN + ':' + this.answers['appName'] + '.git');
            for (var i = 0; i < CRAFT_PLUGINS.length; i++) {
                var plugin = CRAFT_PLUGINS[i];
                console.log('+ ' + chalk.green(plugin.name) + ' added as submodule');
                child_process.execSync('git submodule add -f ' + plugin.url + ' ' + plugin.path);
            }
            console.log(chalk.green('> Adding project files to git repository'));
            child_process.execSync('git add -A');
            child_process.execSync('git add -f craft/storage/.gitignore');
            console.log(chalk.green('> Doing initial commit to git repository'));
            child_process.execSync('git commit -m "initial commit"');
            console.log(chalk.green('> Pushing git repository to origin master'));
            child_process.execSync('git push origin master');
        }
        
/* -- Install Bower modules */

        console.log(chalk.green('> Bower Install'));
        this.bowerInstall(BOWER_OPTIONS);

/* -- Install NPM modules */

        console.log(chalk.green('> NPM Install'));
        this.npmInstall(NPM_OPTIONS);

        },
        
/* -- end - Called last, cleanup, say good bye, etc */

    end: function() {
        console.log(chalk.yellow.bold('[ End ]'));      

/* -- Craft base plugins */

        console.log(chalk.green('> End install commands'));
        for (var i = 0; i < END_INSTALL_COMMANDS.length; i++) {
            var command = END_INSTALL_COMMANDS[i];
            console.log('+ ' + chalk.green(command.name) + ' executed');
            child_process.execSync(command.command);
        }

        console.log(chalk.green('> All set.  Have a nice day.'));
        },
        
});  
