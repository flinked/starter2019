class ScrollReveal
{
    /**
     * Constructor
     */
    constructor( options )
    {
        this.animateEl = document.querySelectorAll('.to-animate')
        this.offset = 0
        this.el = []
    }

    scrollEvent() {
        window.addEventListener('scroll', (e) => {
            this.offset = window.scrollY

            this.el.forEach(element => {
                if(element.offset < this.offset) {
                    element.el.classList.add('animation')
                }
            })
        })
    }

    setObj() {
        this.animateEl.forEach(element => {
            let offsetDelay
            if(element.getAttribute('data-delay')) {
                if(element.getAttribute('data-delay') === 'mid') {
                    offsetDelay = element.getBoundingClientRect().height / 2
                } else {
                    offsetDelay = parseInt(element.getAttribute('data-delay'))
                }
            } else {
                offsetDelay = 0
            }
            let obj = {
                el: element,
                // offset: element.offsetTop,
                offset: element.getBoundingClientRect().top - offsetDelay,
                animate: false
            }
            this.el.push(obj)
        })
    }

    init() {
        if(document.querySelector('.to-animate')) {
            this.scrollEvent()
            this.setObj()
        }
    }
}

export default ScrollReveal
