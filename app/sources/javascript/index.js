import PageTransition from './public/PageTransition'
import Useful from './helpers/Useful'

window.flinked = {}

function init() {

    let useful = new Useful
    useful.printConsol()

    window.flinked.reinit()
}

window.flinked.reinit = function() {

    this.pageTransition = new PageTransition();
    this.pageTransition.init();

    window.flinked.destroy()
}

window.flinked.destroy = function() {
    // window.flinked.onDestroy(window.flinked.scrollSection);
  }
  
  window.flinked.onDestroy = function(obj) {
      if(obj)
      {
          if(obj.destroy)
          {
              obj.destroy();
          }
          obj = null;
      }
  }

window.onload = init