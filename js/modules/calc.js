function calc() {
     //Calc

     const calcResult = document.querySelector('.calculating__result span');

     let sex, height, weight, age, ratio;
 
     if (localStorage.getItem('sex')) {
         sex = localStorage.getItem('sex');
     } else {
         sex = 'female';
         localStorage.setItem('sex', 'female');
     }
 
     if (localStorage.getItem('ratio')) {
         ratio = localStorage.getItem('ratio');
     } else {
         ratio = 'female';
         localStorage.setItem('ratio', 1.375);
     }
     
 
     function calcTotal() {
         if (!sex || !height || !weight || !age || !ratio) {
             calcResult.textContent = '______';
             return;
         } 
 
         if (sex === 'female') {
             calcResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
         } else {
             calcResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
         }
     }
 
     calcTotal();
 
     
     function initLocalSetings (selector, activeClass) {
         const elem = document.querySelectorAll(selector);
 
         elem.forEach(elements => {
             elements.classList.remove(activeClass);
 
             if (elements.getAttribute('id') === localStorage.getItem('sex')) {
                 elements.classList.add(activeClass);
             }
 
             if (elements.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                 elements.classList.add(activeClass);
             }
         })
 
 
     }
 
     initLocalSetings('#gender div' , 'calculating__choose-item_active');
     initLocalSetings('.calculating__choose_big div' , 'calculating__choose-item_active');
 
 
     function getStaticData (selector, activeClass) {
         const elements = document.querySelectorAll(selector);
 
         elements.forEach(elem => {
             elem.addEventListener('click', (e) => {
 
                 if(e.target.getAttribute('data-ratio')) {
                     ratio = +e.target.getAttribute('data-ratio');
 
                     localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
                     
                 } else {
                     sex = e.target.getAttribute('id');
                     localStorage.setItem('sex', e.target.getAttribute('id'));
 
                 }
     
                 // console.log(ratio, sex);
     
     
                 elements.forEach(elem => {
                     elem.classList.remove(activeClass);
                 })
     
     
                 e.target.classList.add(activeClass);
     
                 calcTotal();
             });
         });
     }  
     
     getStaticData('#gender div' , 'calculating__choose-item_active');
     getStaticData('.calculating__choose_big div' , 'calculating__choose-item_active');
 
     function getDinamicData(selector) {
         const input = document.querySelector(selector);
 
         input.addEventListener('input', () => {
             
             switch(input.getAttribute('id')) {
                 case 'height':
                     height = +input.value;
                     break;
                 case 'weight':
                     weight = +input.value;
                     break;
                 case 'age':
                     age = +input.value;
                     break;
             };
 
             calcTotal();
 
         });
 
         
 
     };
 
     getDinamicData('#height');
     getDinamicData('#weight');
     getDinamicData('#age');
}

export default calc;