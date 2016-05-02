<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(

/* -- Common config settings */

    '*' => array(

        'autoLoginAfterAccountActivation' => true,

        'omitScriptNameInUrls' => true,
        'generateTransformsBeforePageLoad' => true,

        'rememberedUserSessionDuration' => 'P1Y',
        'userSessionDuration' => 'P1D',

        'maxUploadFileSize' => 104857600,
    ),

/* -- <%= appName %>.dev developmental settings */

    '<%= appName %>.dev' => array(

        'siteUrl' => 'http://<%= appName %>.dev/',
        'devMode' => true,
        'enableTemplateCaching' => false,
        'environmentVariables' => array(
            'staticAssetsVersion' => time(),
            'basePath' => '/home/vagrant/sites/<%= installDir %>/',
            'baseUrl'  => 'http://<%= appName %>.dev/',
        ),

    ),

/* -- <%= appName %>.com production settings */

    '<%= appName %>.com' => array(

        'siteUrl' => 'http://<%= appName %>.com/',
        'devMode' => false,
        'enableTemplateCaching' => true,
        'environmentVariables' => array(
            'staticAssetsVersion' => '2',
            'basePath' => '/htdocs/<%= installDir %>/',
            'baseUrl'  => 'http://<%= appName %>.com/',
        ),
    ),

);
