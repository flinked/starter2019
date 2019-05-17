<?php

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
	});

	add_filter('template_include', function( $template ) {
		return get_stylesheet_directory() . '/static/no-timber.html';
	});

	return;
}

Timber::$dirname = array( 'app', 'views' );

Timber::$autoescape = false;

class StarterSite extends Timber\Site {
	/** Add timber support. */
	public function __construct() {
		add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
		add_filter( 'timber/context', array( $this, 'add_to_context' ) );
		add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		parent::__construct();
    }
    

	public function register_post_types() {
        add_action( 'init', 'create_post_type' );
            function create_post_type() {
                register_post_type( 'styliste',
                    array(
                    'labels' => array(
                        'name' => 'stylistes',
                        'singular_name' => 'styliste'
                    ),
                    'public' => true,
                    'supports' => array(
                        'title',
                        'editor',
                        'thumbnail'
                    ),
                    'menu_position'       => 5,
                    'menu_icon'           => 'dashicons-businessman',
                    'taxonomies'  => array( 'category' ),
                    )
                );
            }
            create_post_type();

    }
    

	public function register_taxonomies() {

	}

	public function add_to_context( $context ) {
		$context['imageUrl'] = IMAGES_URL;
		$context['publicUrl'] = PUBLIC_URL.'/';
		$context['menu'] = new Timber\Menu('main-menu');
		$context['site'] = $this;
		return $context;
	}

	public function theme_supports() {
		add_theme_support( 'automatic-feed-links' );

		add_theme_support( 'title-tag' );

        add_theme_support( 'post-thumbnails' );
        
		add_theme_support(
			'html5', array(
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);

		add_theme_support(
			'post-formats', array(
				'aside',
				'image',
				'video',
				'quote',
				'link',
				'gallery',
				'audio',
			)
        );
        
        add_theme_support( 'post-thumbnails' );

        if( function_exists('acf_add_options_page') ) {

            acf_add_options_page();

        }

		add_theme_support( 'menus' );
	}

	/** This is where you can add your own functions to twig.
	 *
	 * @param string $twig get extension.
	 */
	public function add_to_twig( $twig ) {
		$twig->addExtension( new Twig_Extension_StringLoader() );
		return $twig;
	}

}

new StarterSite();

add_filter( 'timber_context', 'mytheme_timber_context'  );

function mytheme_timber_context( $context ) {
	$context['options'] = get_fields('options');
	return $context;
}
