<?php
/**
 * [Bo modification]
 */

/*start footer message */

function remove_footer_admin () {
echo "Another wonderful flinked theme";
}
add_filter('admin_footer_text', 'remove_footer_admin');

/*end footer message*/

/*activer les image a la une*/

add_theme_support( 'post-thumbnails' );

if( function_exists('acf_add_options_page') ) {

	acf_add_options_page();

}

function register_my_menu() {
  register_nav_menu('main-menu','Main menu' );
}
add_action( 'init', 'register_my_menu');

define( ‘WP_POST_REVISIONS’, false );


function remove_menus(){

	global $user_ID;

	if($user_ID !== 1) {
		//general
	  remove_menu_page( 'edit.php' );                   //Posts
	  remove_menu_page( 'edit-comments.php' );          //Comments
	  // remove_menu_page( 'themes.php' );                 //Appearance
	  remove_menu_page( 'plugins.php' );                //Plugins
	  remove_menu_page( 'tools.php' );                  //Tools
	  remove_menu_page( 'options-general.php' );        //Settings

	  //plugin
	  remove_menu_page( 'edit.php?post_type=acf-field-group' );    //ACF
	}
}
add_action( 'admin_init', 'remove_menus' );

add_filter( 'gform_confirmation_anchor', '__return_false' );

// disable for posts
add_filter('use_block_editor_for_post', '__return_false', 10);

// disable for post types
add_filter('use_block_editor_for_post_type', '__return_false', 10);

define( ‘WP_POST_REVISIONS’, false );

add_filter('nav_menu_css_class' , 'special_nav_class' , 10 , 2);

function special_nav_class ($classes, $item) {
    if (in_array('current-page-ancestor', $classes) || in_array('current-menu-item', $classes) ){
        $classes[] = 'active ';
    }
    return $classes;
}

add_action( 'gform_enqueue_scripts_1', 'dequeue_gf_stylesheets', 11 );
function dequeue_gf_stylesheets() {
    wp_dequeue_style( 'gforms_reset_css' );
    wp_dequeue_style( 'gforms_datepicker_css' );
    wp_dequeue_style( 'gforms_formsmain_css' );
    wp_dequeue_style( 'gforms_ready_class_css' );
    wp_dequeue_style( 'gforms_browsers_css' );
}

function admin_style() {
	wp_enqueue_style('admin-styles', get_template_directory_uri().'/public/bo/bo.css');
}
add_action('admin_enqueue_scripts', 'admin_style');

function custom_login_css()  {
    echo '<link rel="stylesheet" type="text/css" href="' . get_bloginfo('template_directory') . '/public/bo/login.css" />';
}
add_action('login_head', 'custom_login_css');