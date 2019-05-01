import Barba from 'barba.js'

class BarbaConfig
{
    /**
     * Constructor
     */
    constructor( options )
    {

    }

    getLink(className) {
        return document.querySelectorAll(className)
    }

    settings() {
        Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, barbaContainer, newPageRawHTML) {

            if ( Barba.HistoryManager.history.length === 1 ) {
               return;
            }

            const link = currentStatus.url

            const navigationLinks = document.querySelectorAll('.menu-item');
            const navigationLinkIsActive = document.querySelector(`.menu-item a[href="${link}"]`);
    
            let parent = null
            Array.prototype.forEach.call(navigationLinks, (navigationLink) => navigationLink.classList.remove('active')); // remove CSS class 'is-active' from all .navigation__links
    
            if(document.querySelector(`.menu-item a[href="${link}"]`)) {
              parent = navigationLinkIsActive.parentNode
              parent.classList.add('active');
            }

            var $newPageHead = jQuery( '<head />' ).html(
                jQuery.parseHTML(
                  newPageRawHTML.match( /<head[^>]*>([\s\S.]*)<\/head>/i )[ 0 ],
                  document,
                  true
               )
            );

            var headTags = [
               "link[rel='canonical']",
               "link[rel='shortlink']",
               "link[rel='alternate']",
               "meta[name='description']",
               "meta[property^='og']",
               "meta[name^='twitter']",
               "meta[name='robots']"
            ].join( ',' );
            jQuery('head').find(headTags).remove();
            $newPageHead.find(headTags).appendTo('head');
         });
    }

    init() {

    }
}

export default BarbaConfig
