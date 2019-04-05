<?php
/**
 * The template for displaying all pages
 */

$context = Timber::context();
$timber_post = new Timber\Post();
$context['post'] = $timber_post;
$context['foo'] = 'bar';
$templates = array( 'views/pages/global/index.twig' );

  Timber::render( $templates, $context );
