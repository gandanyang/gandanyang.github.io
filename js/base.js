//大多数页面运行都需要加载的js
//接口统一地址
var url = "https://dev.apis.sh/n3b7A2DwO/";

//静态资源地址需在服务器地址后面添加static前缀 
var url_file = "https://dev.apis.sh/n3b7A2DwO/static/"

var userName = "";
// 全局变量存储用户昵称

// 封装xhr请求函数  请求类型 地址  post时相关数据
/**
 * 封装一个原生的AJAX请求
 * @param {*} type 请求类型 
 * @param {*} url  接口地址
 * @param {*} cb   请求成功的回调函数
 * @param {*} params  请求参数（POST）
 * @param {*} type  请求类型
 */
function ajaxXHR(type, url, cb, params) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = JSON.parse(xhr.response);
            cb(data);
            //执行调用方法
            // cb(xhr.response);
        }
    }
    xhr.open(type, url);
    // xhr.responseType="json";
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(params);
}
/**
 * 封装一个传输数据请求
 * @param {*} type 请求类型 
 * @param {*} url  接口地址
 * @param {*} cb   请求成功的回调函数
 * @param {*} params  请求参数（POST）
 * @param {*} type  请求类型
 */
function postXHR(type, url, cb, params) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = JSON.parse(xhr.response);
            cb(data);
            //执行调用方法
            // cb(xhr.response);
        }
    }
    xhr.open(type, url);
    xhr.withCredentials = true;
    // if (type == "formdata") {
    xhr.setRequestHeader("Content-Type", "multipart/form-data");
    // }
    // xhr.responseType="json";
    xhr.send(params);
}
//通过Localstorage判断用户是否登陆
/**
 * 判断用户是否登陆
 */
function ifLoged() {
    var userIcon = document.getElementById("userIcon");
    var username = document.getElementById("username");
    //已登陆
    if (localStorage.token != undefined) {
        document.getElementById("notLoginNav").style.display = "none";
        document.getElementById("userTopInfo").style.display = "inline-block";
        //加载用户头像 姓名等相关信息
        // userIcon.src = url_file + localStorage.avatar;
        username.innerHTML = localStorage.name;
    } else {
        document.getElementById("notLoginNav").style.display = "inline-block";
        document.getElementById("userTopInfo").style.display = "none";
    }
};