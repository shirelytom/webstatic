import '../scss/yatian.scss'
$(function(){
    //返回顶部
    $('.returnTop').on('click',function(){
        $('body').animate({ scrollTop: 0 }, 1000);
    })
    //首页hover事件
    $(".index").hover(function(){
        $(".nav-content").css("display","block")
    },function(){
        $(".nav-content").css("display","none")
    })
    //兼容手机端滚动隐藏首页hover的内容/返回顶部透明
    $(window).on("scroll",function(){
        $(".nav-content").css("display","none")

        $('#hhService').css('opacity','.6')
        let timer=setTimeout(function(){
            $('#hhService').css('opacity','1')
        },1000)

        $('#collapse').addClass("collapsed")
        $('#collapse').attr("aria-expanded",false)
        $("#bs-example-navbar-collapse-1").removeClass("in")
        $("#bs-example-navbar-collapse-1").attr("aria-expanded",false)

      })
    //防止刷新导航栏激活状态样式回到首页
    $('header li').eq(sessionStorage.getItem('menu')).addClass('active').siblings().removeClass('active')
    //导航栏激活样式 
    $('header li').on('click',function(){
        $(this).addClass('active')
        $(this).siblings().removeClass("active")
        let index=$(this).index()
        sessionStorage.setItem('menu',index)
    })
    //手机端点击链接后自动收缩导航按钮
    $(".nav > li > a").click(function(){
        $('#collapse').addClass("collapsed")
        $('#collapse').attr("aria-expanded",false)
        $("#bs-example-navbar-collapse-1").removeClass("in")
        $("#bs-example-navbar-collapse-1").attr("aria-expanded",false)
    })
    //检测hash地址变化跳转对应内容
    $(window).on('hashchange',link)
    link()
/*     $("#collapse").on('click',function(){ 
        console.log($('#bs-example-navbar-collapse-1').hasClass("in"))
        console.log(!$('#bs-example-navbar-collapse-1').hasClass("in"))
        if(!$('#bs-example-navbar-collapse-1').hasClass("in")){
            $('#collapse').addClass("collapsed")
            $('#collapse').attr("aria-expanded",false)
            $("#bs-example-navbar-collapse-1").removeClass("in")
            $("#bs-example-navbar-collapse-1").attr("aria-expanded",false)
            // debugger
        }else{           
            $('#collapse').removeClass("collapsed")
            $('#collapse').attr("aria-expanded",true)
            $("#bs-example-navbar-collapse-1").addClass("in")
            $("#bs-example-navbar-collapse-1").attr("aria-expanded",true)
            console.log($('#bs-example-navbar-collapse-1').hasClass("in"))
            // debugger
        }
        // debugger
    }) */
/*     $("#collapse").toggle(
        function(){
            $('#collapse').removeClass("collapsed")
            $('#collapse').attr("aria-expanded",true)
            $("#bs-example-navbar-collapse-1").addClass("in")
            $("#bs-example-navbar-collapse-1").attr("aria-expanded",true)
        },
        function(){
            $('#collapse').addClass("collapsed")
            $('#collapse').attr("aria-expanded",false)
            $("#bs-example-navbar-collapse-1").removeClass("in")
            $("#bs-example-navbar-collapse-1").attr("aria-expanded",false)
        }
      ) */
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