
import AutoScroll from './AutoScroll'
import Coords from './Coords'
import CheckMobile from './CheckMobile'
import ResizeEvent from './ResizeEvent'

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
}

export default Useful
