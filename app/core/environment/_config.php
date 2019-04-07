<?php

function custom_wordpress_error_message(){
  return 'invalid login or password';
}
add_filter( 'login_errors', 'custom_wordpress_error_message' );

function wpb_remove_version() {
    return '';
}
add_filter('the_generator', 'wpb_remove_version');

function wpb_custom_logo() {
    echo '
    <style type="text/css">
    #wpadminbar #wp-admin-bar-wp-logo > .ab-item .ab-icon:before {
    background-image: url(' . get_bloginfo('stylesheet_directory') . '/public/bo/flinkedSimple.svg) !important;
    background-position: 0 0;
    color:rgba(0, 0, 0, 0);
    background-size: contain;
    background-repeat: no-repeat;
    }
    #wpadminbar #wp-admin-bar-wp-logo.hover > .ab-item .ab-icon {
    background-position: 0 0;
    }
    </style>
    ';
    }
    //hook into the administrative header output
    add_action('wp_before_admin_bar_render', 'wpb_custom_logo');