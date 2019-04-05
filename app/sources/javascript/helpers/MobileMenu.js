class MobileMenu
{
    /**
     * Constructor
     */
    constructor( openBtn, closeBtn, menuEl  )
    {
        this.openButton = document.querySelector(openBtn)
        this.closeButton = document.querySelector(closeBtn)
        this.menu = document.querySelector(menuEl)
        this.open = false
    }

    clickEvent() {
        this.openButton.addEventListener('click', (e) => {
            e.preventDefault()
            if(this.open === false) {
                this.open = true
                this.menu.classList.add('show')
            }
        })

        this.closeButton.addEventListener('click', (e) => {
            e.preventDefault()
            if(this.open === true) {
                this.open = false
                this.menu.classList.remove('show')
            }
        })
    }

    init() {
        this.clickEvent()
    }
}

export default MobileMenu
