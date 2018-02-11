window.onload = function() {
    document.getElementById("getVerfCode").onclick = function() {
        var mobile = document.getElementById("cellPhoneNum");
        var phone = mobile.value;
        if (phone == "") {
            alert("手机号不能为空！");
            return;
        } else if (!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
            alert("不是完整的11位手机号或者正确的手机号前七位");
            mobile.focus();
            return false;
        } else {
            ajaxXHR('GET', url + 'captcha?type=reset&phone=' + phone, function(data) {
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
    document.getElementById("resetPwdSbm").onclick = function() {
        var mobile = document.getElementById("cellPhoneNum");
        var phone = mobile.value;
        var password = document.getElementById("password").value;
        var password2 = document.getElementById("password2").value;
        var authcode = document.getElementById("verfCode").value;
        if (password != password2) {
            alert("两次密码输入不一致！")
        } else if (!(/^(\w){6,30}$/.test(phone))) {
            // 密码正则判断  
            alert("请输入6-30个字母、数字或下划线!")
        } else {
            var parm = 'password=' + password + '&captcha=' + authcode + '&phone=' + phone;
            ajaxXHR('POST', url + "account/reset", function(data) {
                if (data.code != "SUCCESS") {
                    console.log(data.code);
                    return;
                } else {
                    localStorage.token = data.token;
                    window.location.href = "index.html";
                }
            }, parm)
        }
    }
}