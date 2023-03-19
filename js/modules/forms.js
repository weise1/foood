import {closeModal, openModal} from './modal';
import {PostData} from '../modules/services/services';



function forms(formSelector, modalTimerId) {
    //Forms

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        succses: 'Спасибо скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так.'
    }

    //Перебор всех инпутов и присвоение им скрипта для отправки на сервер
    forms.forEach(item => {
        bindPostData(item);
    });

    

    //Отправка данных на сервер через JSON/ и просто формдату
    function bindPostData(form) {
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

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
            // Метод как записать в данные с инпутов в JSON
            // const object = {};

            // formData.forEach((e , i) => {
            //     object[i] = e;
            // });


            PostData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.succses);
                // form.reset();
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            })
            
            // request.send(json);



        })
    }

    function showThanksModal(message) {
        const modalDialog = document.querySelector('.modal__dialog');

        modalDialog.classList.add('hide');

        openModal('.modal', modalTimerId);

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

            closeModal('.modal');

        }, 5000);
    }
}

export default forms;