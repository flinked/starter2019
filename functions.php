<?php
define( 'THEME_PATH' ,          get_template_directory()                  );
// define( 'TEMPLATE_PATH' ,       THEME_PATH .    '/templates'              );
define( 'THEME_URL' ,           get_template_directory_uri()        );
define( 'CSS_URL' ,             THEME_URL .    '/public/assets/stylesheet/'  );
define( 'IMAGES_URL' ,          THEME_URL .    '/public/assets/image/'       );
define( 'JS_URL' ,              THEME_URL .    '/public/assets/javascript/'  );
define( 'PUBLIC_URL' ,              THEME_URL .    '/public'  );

// LOADING CORE FILES
$folders = array( 'environment', 'postType', 'function', 'ajax' );
foreach ($folders as $folder) {
    foreach ( glob( THEME_PATH . "/app/core/$folder/*.php" ) as $file ) {
        include_once $file;
    }
}

