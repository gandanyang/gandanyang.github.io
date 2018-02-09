//图片预览功能 在写文章页面

var imgReader = "";
//  单张图片上传 上传input名 预览容器id 输出图片class
function uploadPicPreview(filename, contentId, classname) {
    var pic = document.getElementById(filename);
    pic.onchange = function() {
        var file = this.files[0];
        var container = document.getElementById(contentId);
        container.innerHTML = "";
        var filereader = new FileReader();
        filereader.onload = function(e) {
            if (file.size > 1 * 1024 * 1024) {
                alert("上传图片大小不得超过1M");
                return;
            }
            var srcpath = e.target.result;
            showPreviewImage(srcpath);
            imgReader = file;;

        };
        filereader.readAsDataURL(file);

        function showPreviewImage(src) {
            // console.log(src);
            var img = document.createElement('img');
            img.src = src;
            img.className = classname;
            container.appendChild(img);
        }
    }
}