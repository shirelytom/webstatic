import '../scss/yatian.scss'
$(function(){
    $('header li').eq(sessionStorage.getItem('menu')).addClass('active').siblings().removeClass('active')
    //导航栏激活样式 
    $('header li').on('click',function(){
        $(this).addClass('active')
        $(this).siblings().removeClass("active")
        let index=$(this).index()
        sessionStorage.setItem('menu',index)
    })
    $(window).on('hashchange',link)
    link()

})
//封装跳转页面函数
function link(){
    let index=location.hash.indexOf('?')
    let hash=index !=-1?location.hash.substr(0,index):location.hash
        switch(hash){    
        case '#caseDetails':$('#root').load('./caseDetails.html');break; 
        case '#caseCenter':$('#root').load('./caseCenter.html');break; 
        case '#serviceCenter':$('#root').load('./serviceCenter.html');break; 
        case '#solution':$('#root').load('./solution.html');break;   
        case '#newsCenter':$('#root').load('./newsCenter.html');break;
        case '#newsDetails':$('#root').load('./newsDetails.html');break;
        case '#aboutUs':$('#root').load('./aboutUs.html');break;

        default:$('#root').load('./yatian.html');break;
    }
    }