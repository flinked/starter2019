import Barba from 'barba.js'
import BarbaConfig from './BarbaConfig'
import BarbaTransition from './BarbaTransition'

class PageTransition
{
    /**
     * Constructor
     */
    constructor( options )
    {
        this.helper = null
        this.transition = null
        this.transitionObj = {}
        this.lastClickEl = null

    }

    BarbaConfig() {
        Barba.Pjax.start();
        Barba.Prefetch.init();

        // import help
        this.helper = new BarbaConfig;
        this.helper.settings();

        this.transition = new BarbaTransition;

        Barba.Dispatcher.on('linkClicked', (el) => {
            this.lastClickEl = el;
        });

        Barba.Pjax.getTransition = () => {
            let newPageName = Barba.Utils.getCurrentUrl().substr(Barba.Utils.getCurrentUrl().lastIndexOf("/") + 1)
            if(window.innerWidth > 750) {
                if(this.lastClickEl) {
                    if(this.lastClickEl.getAttribute('class') === null || this.lastClickEl.getAttribute('class') === "basicTransition" || this.lastClickEl.classList.contains("basicTransition") || this.lastClickEl.getAttribute('class') === "header__logo") {
                        return this.transition.BasicTransition()
                    } else {
                        return this.transition.fadeTransition()
                    }
                } else {
                    return this.transition.fadeTransition()
                }
            } else {
                return this.transition.fadeTransition()
            }
        };
    }


    init() {
        this.BarbaConfig()
    }
}

export default PageTransition
