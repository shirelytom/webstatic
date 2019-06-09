import '../scss/yatian.scss'
$(function(){
    $('.details-item').eq(0).show().siblings().hide();
    $('.case-nav-item').on('click',function(){
        $(this).addClass('active')
        $(this).siblings().removeClass("active")
        let index=$(this).index()
        $('.details-item').eq(index).show().siblings().hide();
    })
    let params= getUrlParam('id')
    console.log(params)
})
function getUrlParam(name) {//a标签跳转获取参数
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]); return null;
}