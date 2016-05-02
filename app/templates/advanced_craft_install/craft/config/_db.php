<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 */

return array(

/* -- Common config settings */

    '*' => array(
        // The prefix to use when naming tables. This can be no more than 5 characters.
        'tablePrefix' => 'craft',
    ),

/* -- <%= appName %>.dev developmental settings */

    '<%= appName %>.dev' => array(

        // The database server name or IP address. Usually this is 'localhost' or '127.0.0.1'.
        'server' => 'localhost',

        // The database username to connect with.
        'user' => 'homestead',

        // The database password to connect with.
        'password' => 'secret',

        // The name of the database to select.
        'database' => '<%= appName %>',

    ),

/* -- <%= appName %>.com production settings */

    '<%= appName %>.com' => array(

        // The database server name or IP address. Usually this is 'localhost' or '127.0.0.1'.
        'server' => 'localhost',

        // The database username to connect with.
        'user' => '<%= appName %>',

        // The database password to connect with.
        'password' => 'secret',

        // The name of the database to select.
        'database' => '<%= appName %>',
    ),

);
