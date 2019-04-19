<?php
/**
 * Template Name: Home
 *
 * @package WordPress
 * @subpackage Flinked
 */


$context = Timber::context();
$timber_post = new Timber\Post();
$context['post'] = $timber_post;
$context['foo'] = 'bar';
$templates = null;

if (file_exists(THEME_PATH.'/app/Views/pages/home/home.twig')) {
  $templates = array( 'views/pages/home/home.twig' );
} else {
  $templates = array( 'views/pages/sample/home.twig' );
}

  Timber::render( $templates, $context );
  
?>
