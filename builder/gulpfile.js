/**
 * Dependencies
 */
const gulp         = require( 'gulp' ),
    browserify   = require( 'browserify' ),
    babelify     = require( 'babelify' ),
    source       = require( 'vinyl-source-stream' ),
    buffer       = require( 'vinyl-buffer' ),
    gulp_clean   = require( 'gulp-clean' ),
    gulp_sass    = require( 'gulp-sass' ),
    gulp_cssnano = require( 'gulp-cssnano' ),
    gulp_uglify  = require( 'gulp-uglify' ),
    gulp_notify  = require( 'gulp-notify' ),
    sourcemaps   = require( 'gulp-sourcemaps' ),
    watchify     = require( 'watchify' ),
    autoprefixer = require('gulp-autoprefixer'),
    eslint       = require('gulp-eslint'),
    sassGlob     = require('gulp-sass-glob')

/**
 * Params
 */



/**
 * Scripts bundle
 */
let bundlerInit = null

const bundle = function()
{
    bundler.bundle()
        .on( 'error', gulp_notify.onError( { title: 'Gulp: scripts' } ) )
        .pipe( source( 'bundle.js' ) )
        .pipe( buffer() )
        .pipe( sourcemaps.init( { loadMaps: true } ) )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( '../public/assets/javascript' ) )
        .pipe( gulp_notify( { title: 'Gulp: scripts', message: 'success' } ) )
}

const bundleInit = function()
{
    bundlerInit.bundle()
        .on( 'error', gulp_notify.onError( { title: 'Gulp: scripts' } ) )
        .pipe( source( 'bundle.js' ) )
        .pipe( buffer() )
        .pipe( sourcemaps.init( { loadMaps: true } ) )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( '../public/assets/javascript' ) )
        .pipe( gulp_notify( { title: 'Gulp: scripts', message: 'success' } ) )
}

/**
 * Scripts
 */
gulp.task( 'scripts', function()
{
    // Create bundler
    bundler = browserify( {
        cache       : {},
        packageCache: {},
        entries     : '../app/sources/javascript/index.js',
        debug       : true,
        paths       : [ './node_modules', '../app/sources/javascript' ]
    } )
        .transform( 'babelify', { presets: [ 'babel-preset-es2015' ].map( require.resolve ) } )

    // Watch
    bundler.plugin( watchify )

    // Listen to bundler update
    bundler.on( 'update', bundle )

    // Bundle
    bundle()
})

/**
 * Scripts
 */
gulp.task( 'scriptsInit', function()
{
    bundlerInit = browserify( {
        cache       : {},
        packageCache: {},
        entries     : '../app/sources/javascript/index.js',
        debug       : true,
        paths       : [ './node_modules', '../app/sources/javascript' ]
    } )
        .transform( 'babelify', { presets: [ 'babel-preset-es2015' ].map( require.resolve ) } )

    // // Watch
    // bundler.plugin( watchify )

    // // Listen to bundler update
    // bundler.on( 'update', bundle )

    // Bundle
    bundleInit()
})

/**
 * Styles
 */
gulp.task( 'styles', function()
{
    return gulp.src( '../app/sources/sass/main.scss' )
        .pipe(sassGlob())
        .pipe( gulp_sass( {
            compress: false
        } ) )
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .on( 'error', gulp_notify.onError( { title: 'Gulp: styles' } ) )
        .pipe( sourcemaps.init( { loadMaps: true } ) )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( '../public/assets/stylesheet' ) )
        .pipe( gulp_notify( { title: 'Gulp: styles', message: 'success' } ) )
} )


/**
 * Build
 */
gulp.task( 'build-scripts', function()
{
    return gulp.src( '../public/assets/javascript/bundle.js' )
        .pipe( gulp_uglify() )
        .pipe( gulp.dest( '../public/assets/javascript' ) )
} )

gulp.task( 'build-styles', function()
{
    return gulp.src( '../public/assets/stylesheet/main.css' )
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp_cssnano())
        .pipe( gulp.dest( '../public/assets/stylesheet' ) )
} )

gulp.task( 'remove-maps', function()
{
    return gulp.src( [ '../public/assets/javascript/bundle.js.map', '../public/assets/stylesheet/main.css.map' ] )
        .pipe( gulp_clean( { force: true, read: false } ) )
} )

gulp.task('lint', () => {
    return gulp.src(['.eslintrc'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError())
})

// function watchFile() {
//     gulp.watch( '../app/sources/sass/**', ['styles'] )
// }

gulp.task('watch', function() {
    gulp.watch( '../app/**', gulp.series('styles') )
})


gulp.task('build', gulp.series (gulp.parallel('build-scripts', 'build-styles'),
    function (done) {
        return gulp.src( './' )
            .pipe( gulp_notify( {
                title  : 'Gulp: build',
                message: 'success'
            } ) )
    }
))

gulp.task('init', gulp.series (gulp.parallel('styles', 'scriptsInit'),
    function (done) {
        // console.log(done)
    }
))

gulp.task('default', gulp.series (gulp.parallel('styles', 'scripts', 'watch'),
    function (done) { }
))
