import '../scss/yatian.scss'
$(function(){
    $('.tab').on('click',function(){
        $(this).addClass('active')
        $(this).siblings().removeClass("active")
        let index=$(this).index()
        $('.right-content-item').eq(index).show().siblings().hide();
    })
})