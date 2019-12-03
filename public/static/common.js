// import $ from  '../../node_modules/jquery/dist/jquery';
document.querySelector('.reserve').addEventListener('click', ()=> {
    console.log('ok')
    document.querySelector('.modal').classList.add('show')
})

$(document).ready(function(){
    $(".menu").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1000);
    });
})
