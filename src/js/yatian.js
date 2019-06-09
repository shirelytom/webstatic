import '../scss/yatian.scss'
$(function(){
    $('.tab').on('click',function(){
        $(this).addClass('active')
        $(this).siblings().removeClass("active")
        let index=$(this).index()
        $('.right-content-item').eq(index).show().siblings().hide();
    })
    $('.hhService').on('click',function(){
        $('html').animate({ scrollTop: 0 }, 1000);
    })
})