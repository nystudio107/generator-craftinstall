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

const INSTALL_QUESTIONS = [
        {
            type: "list",
            name: 'installList',
            message: 'Select which install to use:',
            choices: [
            ],
            store: true
        },
    ];

const INSTALLS_DIR = "/";

var installs = {};


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
var optionOrPrompt  = require('yeoman-option-or-prompt');

module.exports = yo.generators.Base.extend({

    _optionOrPrompt: optionOrPrompt,

/* -- initializing --  Your initialization methods (checking current project state, getting configs, etc) */

    initializing: function() {
        console.log(chalk.yellow.bold('[ Initializing ]'));

/* -- Set up the download command */

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

        var done = this.async();

/* -- Load in our API JSON configs */

        this.answers = {};
        this.askInstall = true;

        var installPath = this.sourceRoot() + INSTALLS_DIR;
        fs.readdirSync(installPath).forEach(function(file, index) {
            var curPath = installPath + "/" + file;
            if (!fs.statSync(curPath).isDirectory()) {
                var ext = file.substr(file.lastIndexOf('.') + 1);
                if (ext == 'json') {
                    var data = fs.readFileSync(curPath);
                    var obj = JSON.parse(data);
/* -- Fill in the QUESTIONS with the found install JSON file */
                    installs[obj.INSTALL_KEY] = obj;
                    INSTALL_QUESTIONS[0].choices.push({key: obj.INSTALL_KEY, name: obj.INSTALL_NAME, value: obj.INSTALL_KEY});
                    }
                }
            });

/* -- Ask them which install they want */

        if (this.askInstall) {
            this._optionOrPrompt(INSTALL_QUESTIONS, function(answers) {
                this.install = installs[answers.installList];
/* -- Change the templates root based on the install choses */
                this.sourceRoot(this.sourceRoot() + "/" + this.install.INSTALL_KEY);
                done();
                }.bind(this));
            }
        },

/* -- prompting -- Where you prompt users for options (where you'd call this.prompt()) */

    prompting: function() {
        console.log(chalk.yellow.bold('[ Prompting ]'));

        var done = this.async();

/* -- Ask them the name they want for this app */

        this.prompt(this.install.QUESTIONS, function(answers) {
                this.answers = answers;
                var installDirPath = path.dirname(path.normalize(this.destinationPath('package.json')));
                this.answers.installDir = installDirPath.match(/([^\/]*)\/*$/)[1];
                this.answers.templatesDir = 'templates/' + this.install.INSTALL_KEY;
                done();
            }.bind(this));
        },

/* -- configuring -- Saving configurations and configure the project (creating .editorconfig files and other metadata files) */

    configuring: function() {
        console.log(chalk.yellow.bold('[ Configuring ]'));
        console.log(this.answers);

/* -- Create the destination folder */

        var dir = this.answers.appName;
        this.log('+ Creating Craft install folder ' + chalk.green(dir));
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
            }
        this.destinationRoot(this.destinationRoot() + "/" + dir);

/* -- Download files */

        console.log(chalk.green('> Downloading files'));
        for (var i = 0; i < this.install.DOWNLOAD_FILES.length; i++) {
            var done = this.async();
            var download = this.install.DOWNLOAD_FILES[i];
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
        for (var i = 0; i < this.install.DELETE_FILES.length; i++) {
            var file = this.install.DELETE_FILES[i];
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
        for (var i = 0; i < this.install.MOVE_FILES.length; i++) {
            var file = this.install.MOVE_FILES[i];
            console.log('+ ' + file.src + ' moved to ' + chalk.green(file.dest));
            fs.renameSync(file.src,
                file.dest
                );
        }

/* -- Write template files */

        console.log(chalk.green('> Writing template files'));
        for (var i = 0; i < this.install.TEMPLATE_FILES.length; i++) {
            var file = this.install.TEMPLATE_FILES[i];
            console.log('+ ' + this.answers.templatesDir + "/" + file.src + ' wrote to ' + chalk.green(file.dest));
            this.fs.copyTpl(
                this.templatePath(file.src),
                this.destinationPath(file.dest),
                this.answers
            );
        }

/* -- Copy boilerplate files */

        console.log(chalk.green('> Copying boilerplate files'));
        for (var i = 0; i < this.install.BOILERPLATE_FILES.length; i++) {
            var file = this.install.BOILERPLATE_FILES[i];
            console.log('+ ' + this.answers.templatesDir + "/" + file.src + ' copied to ' + chalk.green(file.dest));
            this.fs.copy(
                this.templatePath(file.src),
                this.destinationPath(file.dest)
            );
        }

/* -- Copy boilerplate directories */

        console.log(chalk.green('> Copying boilerplate directories'));
        for (var i = 0; i < this.install.BOILERPLATE_DIRECTORIES.length; i++) {
            var dir = this.install.BOILERPLATE_DIRECTORIES[i];
            console.log('+ ' + this.answers.templatesDir + "/" + dir.src + ' copied to ' + chalk.green(dir.dest));
            ncp(this.templatePath(dir.src), this.destinationPath(dir.dest), function (err) {
                if (err) {
                    return console.error(err);
                }
            });
        }

/* -- mysql db restore */

        console.log(chalk.green('> Mysql database restore'));
        for (var i = 0; i < this.install.MYSQL_DBS.length; i++) {
            var command = "mysqldump -u " + this.install.MYSQL_DBS[i]['user']
                        + " -p"
                        + this.install.MYSQL_DBS[i]['password']
                        + " "
                        +  this.answers.appName
                        + " < "
                        + this.templatePath(this.install.MYSQL_DBS[i]['src']);
            console.log('+ ' + chalk.green(command) + ' executed');
            child_process.execSync(command);
        }

/* -- Craft base plugins */

        console.log(chalk.green('> Cloning base Craft plugins'));
        for (var i = 0; i < this.install.CRAFT_PLUGINS.length; i++) {
            var plugin = this.install.CRAFT_PLUGINS[i];
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

        if (this.install.REMOTE_GIT_ORIGIN) {
            console.log(chalk.green('> Creating bare remote git repository'));
            child_process.execSync("ssh " + this.install.REMOTE_GIT_ORIGIN + " 'git init --bare " + this.answers['appName'] + ".git'");

/* -- Initialize the local git directory, add all of the files, commit them, and push them to origin master */

            console.log(chalk.green('> Initializing local git repository'));
            child_process.execSync('git init');
            child_process.execSync('git remote add origin ' + this.install.REMOTE_GIT_ORIGIN + ':' + this.answers['appName'] + '.git');
            for (var i = 0; i < this.install.CRAFT_PLUGINS.length; i++) {
                var plugin = this.install.CRAFT_PLUGINS[i];
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

        if (fs.existsSync('bower.json')) {
            console.log(chalk.green('> Bower Install'));
            this.bowerInstall(this.install.BOWER_OPTIONS);
            }

/* -- Install NPM modules */

        if (fs.existsSync('package.json')) {
            console.log(chalk.green('> NPM Install'));
            this.npmInstall(this.install.NPM_OPTIONS);
            }
        },

/* -- end - Called last, cleanup, say good bye, etc */

    end: function() {
        console.log(chalk.yellow.bold('[ End ]'));

/* -- End install commands */

        console.log(chalk.green('> End install commands'));
        for (var i = 0; i < this.install.END_INSTALL_COMMANDS.length; i++) {
            var command = this.install.END_INSTALL_COMMANDS[i];
            console.log('+ ' + chalk.green(command.name) + ' executed');
            child_process.execSync(command.command);
        }

        console.log(chalk.green('> All set.  Have a nice day.'));
        },

});
