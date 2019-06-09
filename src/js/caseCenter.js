import '../scss/yatian.scss'
$(function(){
    $('.case').eq(0).show().siblings().hide();
    $('.case-type-item').on('click',function(){
        $(this).addClass('active')
        $(this).siblings().removeClass("active")
        let index=$(this).index()
        $('.case').eq(index).show().siblings().hide();
    })
})