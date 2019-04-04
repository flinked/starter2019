// auto scroll

class AutoScroll
{
    /**
     * Constructor
     */
    constructor( options )
    {

    }

    /**
     * @function closes
     * @description close scrolling project
     */
    autoScroll(dur, section) {
    // select DOM element
    const page = window;

    // init variable

    const to = section;
    const duration = dur;
    const start = page.scrollY;
    const change = to - start;
    let currentTime = 0;
    const increment = 20;

    // animate fonction

    const animateScroll = () => {
        currentTime += increment;
        const val = this.easeInOutQuad(currentTime, start, change, duration);
        page.scroll(0,val);
        if (currentTime < duration) {
        setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
    }

    /**
     * @function easeInOutQuad
     * @description ease transition for closing scroll
     */
    easeInOutQuad(tP, bP, cP, dP) {
    let t = tP;
    const b = bP;
    const c = cP;
    const d = dP;

    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t -= 1;
    return -c / 2 * (t *(t - 2) - 1) + b;
    }

    init(dur, section) {
        this.autoScroll(dur, section)
    }
}

export default AutoScroll
