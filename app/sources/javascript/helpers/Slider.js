class Slider
{
    /**
     * Constructor
     */
    constructor( slider, mover, slide, first, last, back, next, dot, interval )
    {
      this.slider = slider
      this.mover = this.slider.querySelector(mover)
      this.slide = this.slider.querySelectorAll(slide)
      this.firstSlide = this.slider.querySelector(first)
      this.lastSlide = this.slider.querySelector(last)
      this.back =this.slider.querySelector(back)
      this.next =this.slider.querySelector(next)
      this.dot = this.slider.querySelectorAll(dot)
      this.index = 1;
      this.showSlide = 0;
      this.size = 0;
      this.count = 0;
      this.indexDot = 0;
      this.interval = null;
      this.intervalValue = interval;
      this.activeAutoSlide = false
    }

    setSlider() {
      this.count = this.slide.length;
      this.showSlide = this.slide.length -2;
      this.size = this.slider.offsetWidth;

      // set slide size

      this.slide.forEach(element => {
          element.style.width = `${this.size}px`
      });

      this.mover.style.width = `${this.size * this.count + 1}px`;

      this.mover.style.transform = `translateX(-${this.size * this.index}px)`;

      setTimeout(() => {
        this.mover.classList.add('trans')
      }, 20);
    }

    responsive() {
      window.addEventListener('resize', (e) => {
        this.size = this.slider.offsetWidth;

        // set slide size

        this.slide.forEach(element => {
            element.style.width = `${this.size}px`
        });

        this.mover.style.width = `${this.size * this.count + 1}px`;

        this.mover.style.transform = `translateX(-${this.size * this.index}px)`;
      })
    }

    clickEvent() {
      this.next.addEventListener('click', (e) => {
        console.log(this.activeAutoSlide)
        e.preventDefault();
        this.index += 1;
        this.indexDot += 1;

        clearInterval(this.interval)

        if(this.indexDot > this.showSlide -1) {
          this.indexDot = 0;
        }

        if(this.index > this.count -1) {
          this.index = 1;
          this.mover.classList.add('noTrans');
          this.mover.style.transform = `translateX(-${this.size * 1}px)`;
          setTimeout(() => {
            this.index = 2
            this.mover.classList.remove('noTrans');
            this.mover.style.transform = `translateX(-${this.size * this.index}px)`;
            let activeSlide = this.slider.querySelector('.activeSlide')
            activeSlide.classList.remove('activeSlide')
            this.slide[this.index].classList.add('activeSlide')
          }, 20);
        } else {
          if(this.mover.classList.contains('noTrans')) {
            this.mover.classList.remove('noTrans');
          }
          this.mover.style.transform = `translateX(-${this.size * this.index}px)`;
          let activeSlide = this.slider.querySelector('.activeSlide')
          activeSlide.classList.remove('activeSlide')
          this.slide[this.index].classList.add('activeSlide')
        }

        let activeDot = this.slider.querySelector('.slider__dot--active')
        activeDot.classList.remove('slider__dot--active')
        this.dot[this.indexDot].classList.add('slider__dot--active')

        if(this.activeAutoSlide === true) {
          this.autoSlide(this.intervalValue)
        }
      })
      this.back.addEventListener('click', (e) => {
        e.preventDefault();
        this.index -= 1;
        this.indexDot -= 1;

        clearInterval(this.interval)

        if(this.indexDot < 0) {
          this.indexDot = this.showSlide -1;
        }

        if(this.index < 0) {
          this.index = this.count -2;
          this.mover.classList.add('noTrans');
          this.mover.style.transform = `translateX(-${this.size * this.index}px)`;
          setTimeout(() => {
            this.index = this.count -3
            this.mover.classList.remove('noTrans');
            this.mover.style.transform = `translateX(-${this.size * this.index}px)`;
            let activeSlide = document.querySelector('.activeSlide')
            activeSlide.classList.remove('activeSlide')
            this.slide[this.index].classList.add('activeSlide')
          }, 20);
        } else {
          if(this.mover.classList.contains('noTrans')) {
            this.mover.classList.remove('noTrans');
          }
          this.mover.style.transform = `translateX(-${this.size * this.index}px)`;
          let activeSlide = this.slider.querySelector('.activeSlide')
          activeSlide.classList.remove('activeSlide')
          this.slide[this.index].classList.add('activeSlide')
        }
        let activeDot = this.slider.querySelector('.slider__dot--active')
        activeDot.classList.remove('slider__dot--active')
        this.dot[this.indexDot].classList.add('slider__dot--active')
        if(this.activeAutoSlide === true) {
          this.autoSlide(this.intervalValue)
        }
      })
    }

    autoSlide(interval) {
      this.activeAutoSlide = true;
      this.interval = setInterval(() => {
        this.index += 1;
        this.indexDot += 1;

        if(this.indexDot > this.showSlide -1) {
          this.indexDot = 0;
        }

        if(this.index > this.count -1) {
          this.index = 1;
          this.mover.classList.add('noTrans');
          this.mover.style.transform = `translateX(-${this.size * 1}px)`;
          setTimeout(() => {
            this.index = 2
            this.mover.classList.remove('noTrans');
            this.mover.style.transform = `translateX(-${this.size * this.index}px)`;
            let activeSlide = this.slider.querySelector('.activeSlide')
            activeSlide.classList.remove('activeSlide')
            this.slide[this.index].classList.add('activeSlide')
          }, 20);
        } else {
          if(this.mover.classList.contains('noTrans')) {
            this.mover.classList.remove('noTrans');
          }
          this.mover.style.transform = `translateX(-${this.size * this.index}px)`;
          let activeSlide = this.slider.querySelector('.activeSlide')
          activeSlide.classList.remove('activeSlide')
          this.slide[this.index].classList.add('activeSlide')
        }

        let activeDot = this.slider.querySelector('.slider__dot--active')
        activeDot.classList.remove('slider__dot--active')
        this.dot[this.indexDot].classList.add('slider__dot--active')
      }, this.intervalValue);
    }


    init() {
      this.setSlider()
      this.clickEvent()
      this.responsive()
    }
}

export default Slider