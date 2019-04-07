<?php

/**
 * custom dashboard widget
 */

add_action('wp_dashboard_setup', 'my_custom_dashboard_widgets');
 
function my_custom_dashboard_widgets() {
global $wp_meta_boxes;
 
wp_add_dashboard_widget('custom_help_widget', 'Theme documentation', 'custom_dashboard_help');
}
 
function custom_dashboard_help() {
    echo '<div class="customdashwidget">';
    echo '<h2>Welcome your wordpress website!</h2>';
    echo '<p>To change the page content click <a href="';
    echo get_site_url();
    echo  '/wp-admin/edit.php?post_type=page">here</a></p>';
    echo '<p>To add media click <a href="';
    echo get_site_url();
    echo  '/wp-admin/upload.php">here</a></p>';
    echo '<p>To change global content/options of your theme click <a href="';
    echo get_site_url();
    echo  '/wp-admin/admin.php?page=acf-options">here</a></p>';
    echo '<p>To change the menu click <a href="';
    echo get_site_url();
    echo  '/wp-admin/nav-menus.php">here</a></p>';
    echo '</div>';
}