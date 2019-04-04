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
$templates = array( 'views/pages/home/home.twig' );

  Timber::render( $templates, $context );
  
?>
