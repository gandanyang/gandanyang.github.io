//返回按钮函数
function returnBtn() {
    //获取页面可视区高度
    var clientHeight = document.documentElement.clientHeight;
    //正在加载 距离页面顶部高度
    var addLoading = loading.getBoundingClientRect().bottom + loading.offsetHeight;
    // console.log("1'正在加载'底部到视窗顶部的距离:"+addLoading); 
    // console.log("2视窗的距离:"+clientHeight);
    if (loading.getBoundingClientRect().bottom + loading.offsetHeight + 20 < document.documentElement.clientHeight) {
        console.log("'正在加载'底部到视窗顶部的距离:" + addLoading);
        console.log("视窗的距离:" + clientHeight);
        // 当正在加载图标出现在视窗中时，请求下一页文章列表。
        // 请求文章列表接口。
        //设置返回按钮事件 
        var clientHeight = document.documentElement.clientHeight;
        //返回顶部按钮
        var btn = document.getElementById('backTop');
        var timer = null;
        var isTop = true;
        //滚动条滚动时触发
        window.onscroll = function() {
            //获取页面卷起高度
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            //显示回到顶部按钮
            if (osTop >= clientHeight) {
                btn.style.display = "block";
            } else {
                btn.style.display = "none";
            };
            //**回到顶部过程中用户滚动滚动条，停止定时器 
            if (!isTop) {
                clearInterval(timer);
                // console.log("当回到顶部过程中用户滚动滚动条时，isTop为"+isTop); //false
            };
            isTop = false;
        };
        //返回按钮点击事件
        btn.onclick = function() {
            //设置定时器
            timer = setInterval(function() {
                //获取滚动条距离顶部高度
                var osTop = document.documentElement.scrollTop || document.body.scrollTop;
                // console.log('滚动条距离顶部高度 '+osTop);
                //创建一条滚动条距离顶部高度为负数的数据 
                //当点击返回顶部按钮时，用卷起距离 + 为负的卷起距离
                //为负的卷起距离除以一个数 除数越小 为负的卷起距离越接近于卷起距离 滚动条速度越快
                var ispeed = Math.floor(-osTop / 7);
                // console.log('ispeed '+ispeed);
                document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
                //到达顶部，清除定时器
                if (osTop == 0) {
                    clearInterval(timer);
                };
                isTop = true;
            }, 30);
        };
    }
}