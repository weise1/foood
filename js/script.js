document.addEventListener('DOMContentLoaded', () => {

    // Tab

    let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');
        

	function hideTabContent() {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
    })

    //Timer

    const deadline = '2023-04-12';

    function getTimeRemaining(endTime) {
        
        let days, hours, minutes, seconds;

        const t = Date.parse(endTime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        }
              

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };

       
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num;
        }
    }


    function setClock(selector, endTime) {
        const timer  = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
            
        updateClock();

        function updateClock () {
            const t = getTimeRemaining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);


            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }



    }

    setClock('.timer', deadline);

    
    //Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');


    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);

        
    })

    modal.addEventListener('click', (event) => {
        if (event.target == modal || event.target.getAttribute('data-close') == '') closeModal();

    });

    function closeModal () {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = 'visible';
    };

    function openModal () {

        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';

        clearInterval(modalTimerId);
    };



    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('show')) closeModal();
    });

    

    
    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight -2) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }

        
    }

    window.addEventListener('scroll', showModalByScroll);


    //Используем классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 37;
            this.changeUA(); //Конвертер валют применяем сразу после того как пройс попал в аргументы

        }
        //Ченжер валют
        changeUA() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            //Проверка рест оператора в класе (не путой ли масив)
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(clasName => element.classList.add(clasName));    
            }

            //Добавление контента в карточки
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            this.parent.append(element);


        }
    }

    new MenuCard(
        'img/slider/olive-oil.jpg',
        'img',
        'Меню “Постное”',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        10,
        '.menu .container',
        'menu__item',
        'big'
    ).render();

    new MenuCard(
        'img/slider/food-12.jpg',
        'img',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        8,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        'img/slider/paprika.jpg',
        'img',
        'Меню “Фитнес”',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        12,
        '.menu .container',
        'menu__item'
    ).render();

    //Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        succses: 'Спасибо скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так.'
    }

    //Перебор всех инпутов и присвоение им скрипта для отправки на сервер
    forms.forEach(item => {
        postData(item);
    })

    //Отправка данных на сервер через JSON/ и просто формдату
    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            //Отображение статуса отправки данных
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage);

            //Создаем форму отправки 
            

            //Тип отправляемого контента
            // request.setRequestHeader('Content-type', 'aplication/json');

            //Записываем данные в новый обьект которые приходят с формы
            const formData = new FormData(form);    
            
            //Метод как записать в данные с инпутов в JSON
            // const object = {};

            // formData.forEach((e , i) => {
            //     object[i] = e;
            // });

            // const json = JSON.stringify(object);

            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'aplication/json'
                },
                body: FormData
            }).then(data => {
                console.log(data);
                showThanksModal(message.succses);
                form.reset();
                statusMessage.remove();
            }).then()
            
            request.send(json);



            //Обработчик события когда делаем запрос на сервер и убираем оповещение через 2 секунды

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
                    // console.log(request.response);
                    // showThanksModal(message.succses);
                    // form.reset();

                    
                    // statusMessage.remove();
                    
            //     } else {
            //         showThanksModal(message.failure);

            //     }
            // });


        })
    }

    function showThanksModal(message) {
        const modalDialog = document.querySelector('.modal__dialog');

        modalDialog.classList.add('hide');

        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');

        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class='modal__close bat data-close'>×</div>
            <div class='modal__title'>${message}</div>  
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            modalDialog.classList.add('show');
            modalDialog.classList.remove('hide');

            closeModal();

        }, 5000);
    }

    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: 'POST',
    //     body: JSON.stringify({name: 'Alex'}),
    //     headers: {
    //         'Content-type' : 'application'
    //     }
    // })
    //   .then(response => response.json())
    //   .then(json => console.log(json))


    const req  = new Promise( (resolve, reject) => {
        setTimeout(() => {

            console.log('Подготовка данных...');

            const product = {
                name: 'TV',
                price: 2000
            };

            setTimeout(() => {
                product.status = 'order';
                console.log(product);
            }, 2000);

        }, 2000);
    });
      

    

})









