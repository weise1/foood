function slider({container, slide, nexArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    //Slider

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          pervius = document.querySelector(prevArrow),
          next = document.querySelector(nexArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          sliderFild = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;


    let slideIndex = 1;

    let offset = 0;

    const widthInt = (width) => {
        return parseInt(width.replace(/\D/g, ''));
    };


    
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = `${slides.length}`;
        current.textContent = slideIndex;

    }

    sliderFild.style.width = 100 * slides.length + '%';

    sliderFild.style.display = 'flex';
    sliderFild.style.transition = '0.5s all';


    slidesWrapper.style.overflow = 'hidden';


    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);


    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        

        if ( i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        
        if (offset == widthInt(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += widthInt(width);
        }


        sliderFild.style.transform = `translateX(-${offset}px)`;

        if ( slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }


        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }


        dots.forEach(item => item.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });


    pervius.addEventListener('click', () => {

        
        if (offset == 0) {
            offset = widthInt(width) * (slides.length - 1);
        } else {
            offset -= widthInt(width);
        }


        sliderFild.style.transform = `translateX(-${offset}px)`;

        if ( slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }


        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(item => item.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    //Slider dot

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            

            slideIndex = slideTo;
            offset = widthInt(width) * (slideTo - 1);

            sliderFild.style.transform = `translateX(-${offset}px)`;


            dots.forEach(item => item.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;

            

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

        });
    });
}

export default slider;