const modal = document.querySelector('.modal');
const reserve = document.querySelector('.reserve');
const modalOverlay = document.querySelector('.modal-overlay');


reserve.addEventListener('click', ()=> {
    modal.classList.add('show');
    modalOverlay.classList.add('show');
})

modal.addEventListener('click', ()=> {
    modal.classList.remove('show');
    modalOverlay.classList.remove('show');
})


$(document).ready(function(){
    $(".menu").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1000);
    });
})


