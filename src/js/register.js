import '../scss/register.scss'
window.onload = function () {
    //获取节点
    let btn_join=document.querySelector('.btn_join') //立即加入按钮
    let btn_register=document.querySelector('.btn_register') //立即注册按钮
    let btn_getCode=document.querySelector('.btn_getCode') //获取验证码按钮
    let btn_download=document.querySelector('.btn_download') //立即下载按钮
    let modal_register=document.querySelector('.modal_register') //注册弹窗
    let modal_register_success=document.querySelector('.modal_register_success') //注册成功弹窗
    let successTel=document.querySelector('.successTel') //注册成功弹窗手机号
	let modal_guide=document.querySelector('.modal_guide') //获取引导弹窗
	let img=document.querySelectorAll('img')

    let errorTips=document.querySelector('#errorTips') //错误提示


/*     if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        alert(navigator.userAgent+'现在移动端打开的')
    } else {
        alert(navigator.userAgent+'现在是pc端打开的')
    } */

    //公共方法
/*     let url = 'http://api.huixuebang.com';

    function GetRequest() {
        let url = location.search; //获取url中"?"符后的字串
        let theRequest = new Object();
        if (url.indexOf("?") != -1) {
            let str = url.substr(1);
            strs = str.split("&");
            for (let i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    } */
    //处理手机号
    function dealMobile(tel){
       return tel.substr(0,3)+"****"+tel.substr(7)
    }

    //注册加入事件
    btn_join.addEventListener('click',function(){
        modal_register.style.visibility='visible'
        // modal_register.style.display='inline-block'
    })

    //获取验证码
    btn_getCode.addEventListener('click',function(){
        getcode()
    })
    //注册用户注册事件
    btn_register.addEventListener('click',function(){
        register()
    })
    //注册立即下载事件
    btn_download.addEventListener('click',function(){
        download()
    })
/* 
	img.forEach((item)=>{
		item.addEventListener('click',function(e){
			e.preventDefault()
		})
	}) */

// 获取验证码
function getcode() {
    let regPho = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    let mobile = document.getElementById('mobile').value;
	if (mobile) {
		if (!regPho.test(mobile)) {
			error('您输入的手机号不符合规范，请重新输入');
          	return;
        };
	}else{
		error('请输入手机号');
    return;
	}
	$.ajax({
	    type: "get",
	    url: url + '/user-api/sendMsg/' + mobile,
	    contentType: "application/json; charset=utf-8",
	    timeout: 5000,
	    success: function (data) {
	        if (data.code === "000000") {
	        	btn_getCode.style['pointer-events'] = 'none'
	        	btn_getCode.style['color'] = '#BEBEBE'
	        	let time = 60
	        	let interval = window.setInterval(function () {
	        		btn_getCode.innerHTML = time + ' 秒后重新获取';
		            if ((time--) <= 0) {
		            	btn_getCode.style['pointer-events'] = 'auto'
		            	btn_getCode.style['color'] = '#1081F7'
		              	btn_getCode.innerHTML = '获取验证码';
		              	window.clearInterval(interval)
		            }
		          }, 1000)
	        } else {
	        	error('验证码发送频繁，请稍后再试');
	        }
	    },
	    error: function (data) {
	        error('网络错误');
	    }
	})
}

// 注册
function register () {
	let regPho = /^[1][3,4,5,7,8,9][0-9]{9}$/;
	let reg = /^.{6,20}$/;
    let refereeUid = '';
    let mobile = document.getElementById('mobile').value;
	let password = document.querySelector('.password').value;
	let code = document.querySelector('.code').value;

	const theRequest = GetRequest();
	if (theRequest.num) {
		refereeUid = theRequest.num
	};
	if (mobile) {
		if (!regPho.test(mobile)) {
			error('您输入的手机号不符合规范，请重新输入');
          	return;
        };
	} else {
		error('手机不能为空，请输入手机号');
		return;
	};

	if(!code){
		error('验证码不能为空');
		return;
	}
	if (password) {
		if (!reg.test(password)) {
			error('您输入的密码不符合规范，请输入6~14位密码');
          	return;
        };
	} else {
		error('密码不能为空，请输入6~20位密码');
		return;
	};

	
	let postdata = {
		mobile: mobile,
		password: password,
		code: code,
		refereeUid: refereeUid
	};
	$.ajax({
	    type: "post",
	    url: url + '/user-api/register',
	    dataType: "json",
	    contentType: "application/json; charset=utf-8",
	    data: JSON.stringify(postdata),
	    timeout: 5000,
	    success: function (data) {
	        if (data.code === "000000") {
	        	// $('#enroll').hide();
                // window.location.href = 'http://www.huixuebang.com/'
                modal_register.style.visibility='hidden'
                modal_register_success.style.visibility='visible'
                successTel.innerHTML=dealMobile(postdata.mobile)
	        } else {
	        	if (data.message === '用户已存在') {
							error('注册失败，该手机号已注册，请勿重复注册');
							setTimeout(function(){
								window.location.href = 'http://www.huixuebang.com/'
							},3000)
	        	} else if (data.message === '验证码错误') {
	        		error('您输入的验证码有误，请重新输入');
	        	} else {
	        		error('网络问题，请稍后重试');
	        	}
	        }
	    },
	    error: function (data) {
	        error('网络错误');
	    }
	})
}

function download(){
    var wx = (function () { return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1 })();
    if (wx) {
        //是微信环境
        modal_guide.style.visibility='visible'
    } else {
        //不是微信环境
        // modal_guide.style.visibility='hidden'
        window.location.href = 'http://www.huixuebang.com/'
    }
}
// 错误处理
function error (msg) {
	let time = 3
    // $('#errorTips').html(msg + '(3秒)');
	// $('#errorTips').show();
    errorTips.innerHTML=msg+'(3秒)'
    errorTips.style.display='block'
    // errorTips.style.visibility='visible'
	let timer = window.setInterval(function () {
			time--;
            // $('#errorTips').html(msg + '(' + time + '秒)');
            errorTips.innerHTML=msg + '(' + time + '秒)'
	        if (time <= 0) {
                // $('#errorTips').hide();
                // errorTips.style.visibility='hidden'
                errorTips.style.display='none'
                window.clearInterval(timer)
	        }
	      }, 1000)
}
}