function ifLoged() {
    var userIcon = document.getElementById("userIcon");
    var username = document.getElementById("username");
    //已登陆
    if (LocalStorage.token != undefined) {
        document.getElementById("notLoginNav").style.display = "none";
        document.getElementById("userTopInfo").style.display = "inline-block";
        //加载用户头像 姓名等相关信息
        userIcon.src = url_file + LocalStorage.avatar;
        username.innerHTML = localStorage.name;
    } else {
        document.getElementById("notLoginNav").style.display = "inline-block";
        document.getElementById("userTopInfo").style.display = "none";
    }
};