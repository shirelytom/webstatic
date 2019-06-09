import '../scss/yatian.scss'
$(function(){
    $('.advantageBox').eq(0).show().siblings('.advantageBox').hide();
    $('.advantage').on('click',function(){
        $(this).addClass('active')
        $(this).siblings().removeClass("active")
        let index=$(this).index()
        $('.advantageBox').eq(index).show().siblings('.advantageBox').hide();
    })
})