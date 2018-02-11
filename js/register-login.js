var regC = document.getElementById("reg-click");
var logC = document.getElementById("log-click");
var fastLogC = document.getElementById("fastLogin");
var regPart = document.getElementById("register-input");
var loginPart = document.getElementById("login-input");
var fastLog = document.getElementById("clickLog");
fastLog.addEventListener("click", transToLog);
regC.addEventListener("click", transToReg);
logC.addEventListener("click", transToLog);

function transToLog() {

    regC.classList.remove("active");
    logC.classList.add("active");
    regPart.style.display = "none";
    fastLogC.style.display = "none";
    loginPart.style.display = "block";
}

function transToReg() {
    logC.classList.remove("active");
    regC.classList.add("active");
    loginPart.style.display = "none";
    regPart.style.display = "block";
    fastLogC.style.display = "block";
}

var cache;


document.getElementById("getRegVerfCode").onclick = function() {
    var mobile = document.getElementById("regCellPhoneNum");
    var phone = mobile.value;
    if (phone == "") {
        alert("手机号不能为空！");
        return;
    } else if (!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
        alert("不是完整的11位手机号或者正确的手机号前七位");
        mobile.focus();
        return false;
    } else {
        ajaxXHR('GET', url + 'captcha?type=register&phone=' + phone, function(data) {
            cache = data.captcha;
            if (data.code == "SUCCESS") {
                console.log("您的验证码为： " + data.captcha);
            } else if (data.code == "account_has_registered") {
                console.log("手机号已被注册!");
            } else if (data.code == "phone_format_error") {
                alert("手机号格式错误");
            } else if (data.code == "param_type_error") {
                alert("验证码类型错误");
            }
        })
    }
}
document.getElementById("regSubmit").onclick = function() {
    var mobile = document.getElementById("cellPhoneNum").value;
    var phone = mobile.value;
    var pwd1 = document.getElementById("passwordReg").value;
    var pwd2 = document.getElementById("password2Reg").value;
    var authcode = document.getElementById("verfRegCode").value;
    if (pwd1 != pwd2) {
        alert("两次密码输入不一致！")
    } else if (!(/^(\w){6,30}$/.test(pwd1))) {
        // 密码正则判断  
        // 
        alert("请输入6-30个字母、数字或下划线!")

    } else {
        postXHR('POST', url + "account/register", function(data) {
            cache = data.data.user;
            if (data.code == "SUCCESS") {
                console.log("注册成功" + cache);
                localStorage.token = data.data.user.token;
                localStorage.account = data.data.user.account;
                localStorage.avatar = data.data.user.avatar;
                localStorage.name = data.data.user.name;
                localStorage.pwd = pwd1;
                window.location.href = 'index.html';
            } else if (data.code == "param_incomplete") {
                console.log(data.message);
            } else if (data.code == "phone_format_error") {
                console.log(data.message);
            } else if (data.code == "sms_captcha_fail") {
                console.log(data.message);
            } else if (data.code == "sms_captcha_overdue") {
                console.log(data.message);
            }
        }, "account=" + phone + "&password=" + pwd1 + "&captcha=" + authcode);
    }
}

document.getElementById("logSubmit").onclick = function() {
        var mobile = document.getElementById("logCellPhoneNum");
        var phone = mobile.value;
        var pwd = document.getElementById("passwordLog").value;
        if (pwd == '') {
            alert('请输入密码！')
            document.getElementById("passwordLog").focus();
            return false;
        } else if (!(/^1[3|4|5|7|8]\d{9}$/.test(pwd))) {
            alert("不是完整的11位手机号或者正确的手机号前七位");
            mobile.focus();
            return false;
        } else {
            ajaxXHR('POST', url + "account/login", function(data) {
                cache = data.data.user;
                if (data.code == "SUCCESS") {
                    console.log("登陆成功" + cache);
                    localStorage.token = data.data.user.token;
                    localStorage.account = data.data.user.account;
                    localStorage.avatar = data.data.user.avatar;
                    localStorage.name = data.data.user.name;
                    localStorage.pwd = pwd;
                    localStorage.id = data.data.user.id;
                    localStorage.constellations = data.data.user.constellations;
                    localStorage.background = data.data.user.background;
                    window.location.href = 'index.html';
                } else if (data.code == "param_incomplete") {
                    console.log(data.message);
                } else if (data.code == "account_password_error") {
                    console.log(data.message);
                }
            }, "account=" + phone + "&password=" + pwd);
        }
    }
    //登陆/注册成功保存相关信息至LOCALSTORAGE