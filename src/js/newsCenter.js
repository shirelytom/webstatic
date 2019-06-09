import '../scss/yatian.scss'
$('.details-item').eq(0).show().siblings().hide();
$('.news-type-item').on('click',function(){
    $(this).addClass('active')
    $(this).siblings().removeClass("active")
    let index=$(this).index()
    $('.news-item').eq(index).show().siblings().hide();
})
