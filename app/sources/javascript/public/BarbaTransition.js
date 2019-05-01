import Barba from 'barba.js'

class BarbaTransition
{
    /**
     * Constructor
     */
    constructor( options )
    {

    }

    fadeTransition() {
        var FadeTransition = Barba.BaseTransition.extend({
            start: function() {
                Promise
                    .all([this.newContainerLoading, this.fadeOut()])
                    .then(this.fadeIn.bind(this));
            },

            fadeOut: function() {
                return jQuery(this.oldContainer).animate({ opacity: 0 }).promise();
            },

            fadeIn: function() {

                    window.scroll(0,0)
                    
                    var _this = this;
                    var $el = jQuery(this.newContainer);

                    let header = {
                        menu: document.querySelector('.header'),
                    }
                

                    header.menu.classList.remove('hideAnimation')

                    jQuery(this.oldContainer).hide();

                    $el.css({
                        visibility : 'visible',
                        opacity : 0
                    });

                    $el.animate({ opacity: 1 }, 400, function() {
                        _this.done();
                        window.flinked.reinit()
                    });
                }
          });

          return FadeTransition
    }

    BasicTransition() {
        var BasicTransition = Barba.BaseTransition.extend({
            start: function() {
              Promise
                .all([this.newContainerLoading, this.fadeOut()])
                .then(this.fadeIn.bind(this));
            },

            fadeOut: function() {
              let deferred = Barba.Utils.deferred()

              let header = {
                menu: document.querySelector('.header'),
              }

              header.menu.classList.add('hideAnimation')

              this.oldContainer.classList.add('hideContainer')

              setTimeout(() => {
                window.scroll(0,0)
              }, 250 + 800);

              setTimeout(() => {
                deferred.resolve();
              }, 250 + 1000);

              return deferred.promise;
            },

            fadeIn: function() {

              var _this = this;
              var $el = jQuery(this.newContainer);

              let page = {
                page: this.newContainer.querySelector('main'),
              }

              let header = {
                menu: document.querySelector('.header'),
              }

              setTimeout(() => {
                page.page.classList.add('activePage')
              }, 500);

              setTimeout(() => {
                header.menu.classList.remove('hideAnimation')
              }, 800);

              setTimeout(() => {
                _this.done();
                window.flinked.reinit()
              }, 700);


              jQuery(this.oldContainer).hide();

              $el.css({
                visibility : 'visible',
              });
            }
          });

          return BasicTransition
    }

    init() {

    }
}

export default BarbaTransition
