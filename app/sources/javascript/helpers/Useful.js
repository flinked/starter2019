
import AutoScroll from './AutoScroll'
import Coords from './Coords'
import CheckMobile from './CheckMobile'
import ResizeEvent from './ResizeEvent'
import ConsolSignature from './ConsolSignature'

class Useful
{

    autoScroll() {
        let autoScroll = new AutoScroll
        autoScroll.init()
    }

    coords() {
        let coords = new Coords
        coords.init()
    }

    mobile() {
        let mobile = new CheckMobile
        return mobile.init()
    }

    resize() {
        let resizeEvent = new ResizeEvent
        return resizeEvent.init()
    }

    print() {
        let resizeEvent = new ResizeEvent
        return resizeEvent.init()
    }

    printConsol() {
        let consolSignature = new ConsolSignature
        return consolSignature.init()
    }
}

export default Useful
