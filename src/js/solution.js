import '../scss/yatian.scss'
$(function(){
    $('.slide-block').eq(0).children('.content').show().addClass('animated bounceInRight')
    $('.slide-block h4').on('click',function(){
        console.log($(this).parents('.slide-block').children('.content'))
       $(this).parents('.slide-block').children('.content').show().addClass('animated bounceInRight')
       $(this).parents('.slide-block').siblings().children('.content').hide()
    })
})