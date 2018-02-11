 ifLoged();
 document.getElementById("uploadMainpic").onclick = function() {


     //显示图片下方的黑色更换图片按钮框
     document.getElementById("clickChgPic").style.display = "block";
     uploadPicPreview("hidenUploader", "div-img", "essayMainPic");
     document.getElementById("submit").onclick = function(data) {
         var token = localStorage.token;
         var title = document.getElementById("essayTitleVal").value;
         var essay = document.getElementById("essayMain").value;
         var formData = new FormData();
         formData.append("token", token);
         formData.append("title", title);
         formData.append("pic", imgReader);
         formData.append("body", essay);
         postXHR('POST', url + "posts/add", function(data) {
             if (data.code != "SUCCESS") {
                 alert(data.message);
                 return;
             } else {
                 console.log(data);
                 console.log("success");
                 window.location.href = "index.html";
             }
         }, formData)
     }
 };

 document.getElementById("logout").onclick = function confirmLogout() {
     var msg = "您真的确定要退出登陆吗？\n\n请确认！";
     if (confirm(msg) == true) {
         localStorage.removeItem("token");
         window.location.href = "register&login.html";
     } else {
         return false;
     }

 }