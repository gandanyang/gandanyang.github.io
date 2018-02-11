window.onload = function() {
        ifLoged();
        window.addEventListener('scroll', _.throttle(lazyLoad(), 100));
        window.addEventListener('scroll', _.throttle(checkImg, 100));
        // ifLoged();
        //通过本地数据加载header 用户相关信息
        // document.getElementsByClassName("person-icon")[0].src = url_file + localStorage.avatar;
        document.getElementsByClassName("sex-icon")[0].src = (localStorage.gander = "man") ? "image/icon_boy.png" : (localStorage.gander = "woman") ? ("image/icon_girl.png") : ("image/loadfail.jpg");
        document.getElementsByClassName("personName")[0].innerHTML = localStorage.name;
        document.getElementsByClassName("personCity")[0].innerHTML = localStorage.cityname;
        document.getElementsByClassName("personSign")[0].innerHTML = localStorage.constellation;
        // window.addEventListener('scroll', _.throttle(checkImg, 1000));
        loadArticle(1);
    }
    /**
     * 图片懒加载
     */
function lazyLoad() {
    if (pageIndex === undefined) {
        var pageIndex = 2;
    }
    var loading = document.getElementById("loading");
    // console.log(loading.getBoundingClientRect().top);
    // console.log(loading.offsetHeight);
    // console.log(document.documentElement.clientHeight);
    // console.log("------------------------------------");
    // var timestampnow = (new Date()).valueOf();
    return function() {
            var loading = document.getElementById("loading");
            if (loading.getBoundingClientRect().top + loading.offsetHeight < document.documentElement.clientHeight) {
                // var timestampnow = (new Date()).valueOf();
                // console.log(timestamp);
                // console.log(timestampnow);
                loadArticle(pageIndex++);
                // 当正在加载图标出现在视窗中时，请求下一页文章列表。
            }
        }
        // console.log(timestamp);
        // console.log(timestampnow);
        // if (timestampnow - timestamp <= 1000 && timestampnow - timestamp > 100) {}
        // var pageuserid = localStorage._id;
        // 请求文章列表接口。
        // 文章数动态更新
        // 当正在加载图标出现在视窗中时，请求下一页文章列表。
}
/**
 * 
 * @param {*} pageIndex 页数
 */
function loadArticle(pageIndex) {
    // 模拟一个ajax请求的返回结果
    var data = {
        "code": "SUCCESS",
        "data": {
            "articles": [{
                "_id": "5a17f9d0396c3149ac92aef1",
                "title": "怎样的食物才是好零食？",
                "cover": "cover/8052f5d11e28254871009d7f5e4fd969",
                "abstract": "婴儿出生前，营养物质的摄入，通过一根脐带，从母亲体内直接获取。婴儿出生，哭声意味着呼吸系统开始启动，剪短脐带的那一刻开始，营养的吸收和利用，就要依靠婴儿自己消化吸收系统。婴儿...",
                "create_time": 1511511004000,
                "author": {
                    "_id": "5a17f9c9396c3149ac92ae79",
                    "name": "小王子的鞋",
                    "gender": "woman",
                    "constellations": "处女座",
                    "avatar": "avatar/63c632ee37ca94f094a98a0363c0f36f",
                    "city": ["新疆维吾尔自治区 博尔塔拉蒙古自治州"]
                },
                "look_sum": 8,
                "praise_sum": 0
            }, {
                "_id": "5a17f9ce396c3149ac92aeb8",
                "title": "别特么每次一出事，就让我教孩子学会自保",
                "cover": "cover/fd6e446c0fcf8b7ba0c14d8e2f69d27e",
                "abstract": "最近听到最多的一句话是：“这世界怎么了？” 最发达的几个城市，幼儿园接二连三成为焦点的原因，竟是在刷新对人性下限的认识。 “宝贝，芥末是什么味道？” “疼……” “都什么时候...",
                "create_time": 1511509988000,
                "author": {
                    "_id": "5a17f9c9396c3149ac92ae6e",
                    "name": "槽值",
                    "gender": "man",
                    "constellations": "摩羯座",
                    "avatar": "avatar/c166b26c480b42c315234131712b68c8",
                    "city": ["上海 上海市"]
                },
                "look_sum": 2061,
                "praise_sum": 114
            }, {
                "_id": "5a17f9da396c3149ac92af81",
                "title": "郦波解读李瑞《听筝》",
                "cover": "cover/1692b5f9fc74b788f31c6532df71e761",
                "abstract": "上一回我们讲了叶上题诗和衣上题诗的红叶传情。今天呢，我们来讲一首和乐器有关的情诗，这就是被称为是“大历十才子”之一的李端，他的名作《听筝》，诗云： 鸣筝金粟柱，素手玉房前。 ...",
                "create_time": 1511507890000,
                "author": {
                    "_id": "5a17f9c9396c3149ac92ae9d",
                    "name": "流星雨儿下",
                    "gender": "man",
                    "constellations": "处女座",
                    "avatar": "avatar/947ea47096a1fbc5763f2275b2818222",
                    "city": ["西藏自治区 林芝地区"]
                },
                "look_sum": 109,
                "praise_sum": 8
            }, {
                "_id": "5a17f9d5396c3149ac92af40",
                "title": "Raúl Garreta大神教你5步搭建机器学习文本分类器：MonkeyLearn",
                "cover": "cover/d737310bc777504fde808ea4a1741b3e",
                "abstract": "摘要：Raúl Garreta，《Learning scikit-learn: Machine Learning in Python》一书作者，手把手教你5步搭建机器学习文本...",
                "create_time": 1511507739000,
                "author": {
                    "_id": "5a17f9c9396c3149ac92ae91",
                    "name": "阿里云云栖社区",
                    "gender": "woman",
                    "constellations": "双鱼座",
                    "avatar": "avatar/fa50f47d5dac7fa4f590f863283c145f",
                    "city": ["山西省 朔州市"]
                },
                "look_sum": 44,
                "praise_sum": 1
            }]
        },
        "count": 232
    }
    var essayData = data.data.articles;
    var essay = "";
    for (var i = 0; i < essayData.length; i++) {
        const e = essayData[i];
        essay += '<div class="essayList-item">';
        essay += '<a class="openArticle" data-id="' + e._id + '" href="articleDetail.html">';
        // preloadImages
        loadpath = "image/loading.gif";
        realpath = "image/success.jpg";
        // realpath = url_file + e.cover;
        essay += '<img class="essay-pic cover" data-src="' + realpath + '" src="' + loadpath + '">';
        essay += '</a><div class = "essaySummary"><div class="title"><a class="openArticle" data-id="' + e._id + '" href="articleDetail.html" ><p class="font18">';
        essay += e.title + '</p> </a></div>';
        essay += '<p class="abstract">' + e.abstract + '</p>';
        //使用本地图片以节约资源
        preavatar = "image/3.jpg";
        avatarpath = url_file + e.author.avatar;
        essay += '<div class ="meta"><a  class ="author" href="homepage.html" data-_id="' + e.author._id + '>   ' + '<img class = "author-icon" src ="' + preavatar + '">';
        essay += '<p class="authorName">' + e.author.name + '</p>';
        // moment.js 格式化时间戳
        essay += '<p class="publishTime">' + moment(e.create_time).format('YYYY-MM-DD HH:mm:ss') + '</p>'
        essay += '</a> <span class = "praiseCount" > <i> </i>' + e.praise_sum + '</span>';
        essay += '<span class="visitCount"><i> </i>' + e.look_sum + '</span></div></div></div>';
    }
    document.getElementById("loading").insertAdjacentHTML('beforebegin', essay);
    document.getElementById("essayCount").innerHTML = "(" + data.count + ")";
    checkImg();
    listenDetailHref();
    // ajaxXHR('GET', url + "posts/list?page=" + pageIndex + "&limit=3&user=" + pageuserid, function(data) {
    //     console.log(data);
    //     if (data.code != "SUCCESS" || data.data.articles.length == 0) {
    //         document.getElementById("loading").innerHTML = "<strong>没有更多文章！</strong>"
    //         return false;
    //     }
    //     var essayData = data.data.articles;
    //     var essay = "";
    //     for (let i = 0; i < essayData.length; i++) {
    //         essay += '<div class="essayList-item">';
    //         essay += '<a class="openArticle" data-id="' + e._id + '" href="articleDetail.html">';
    //         // preloadImages
    //         loadpath = "image/icon-loading.gif";
    //         realpath = url_file + e.cover;
    //         essay += '<img class="essay-pic cover" data-src="' + realpath + '" src="' + loadpath + '">';
    //         essay += '</a><div class = "essaySummary"><div class="title"><a class="openArticle" data-id="' + e._id + '" href="articleDetail.html" >';
    //         essay += e.title + '</a></div>';
    //         essay += '<p class="abstract">' + e.abstract + '</p>';
    //         //使用本地图片以节约资源
    //         preavatar = "image/3.jpg";
    //         avatarpath = url_file + e.author.avatar;
    //         essay += '<div class ="meta"><div class ="author">   ' + '<img class = "author-icon" src ="' + preavatar + '">';
    //         essay += '<p class="authorName">' + e.author.name + '</p>';
    //         // moment.js 格式化时间戳
    //         essay += '<p class="publishTime">' + moment(e.create_time).format('YYYY-MM-DD HH:mm:ss') + '</p>'
    //         essay += '</div> <span class = "praiseCount" > <i> </i>' + e.praise_sum + '</span>';
    //         essay += '<span class="visitCount"><i> </i>' + e.look_sum + '</span></div></div></div>';
    //         
    //     }
    //     document.getElementsByClassName("essayList-main")[0].insertAdjacentHTML('afterbegin', essay);
    // })

}
/**
 * 动态监测图片是否抵达视口
 */
function checkImg() {
    var imgs = document.getElementsByClassName("cover");
    for (let index = 0; index < imgs.length; index++) {
        var imageHeight = imgs[index].offsetTop;
        if (imageHeight < document.documentElement.clientHeight + document.documentElement.scrollTop) {
            preload_images(imgs[index]);
            imgs[index].classList.remove("cover");
        }
    }
};

/**
 * 预加载图片
 */
function preload_images(img) {
    var temp_img = new Image();
    //预加载图片
    // temp_img.src = url_file + img.dataset.src;
    temp_img.src = img.dataset.src;
    //图片加载成功后，替换临时图片
    temp_img.onload = function() {
            // img.src = url_file + img.dataset.src;
            img.src = "image/2.jpg";
        }
        //加载失败
    temp_img.onerror = function() {
        img.src = "image/loadfail.jpg";
    }
}
/**
 * 给a需要点击定向跳转的a添加点击事件
 */
function listenDetailHref() {
    var hrefToDetail = document.getElementsByClassName("openArticle");
    for (let i = 0; i < hrefToDetail.length; i++) {
        hrefToDetail[i].onclick = function() {
            localStorage.author_id = hrefToDetail[i].dataset.id;
            localStorage.abstract = hrefToDetail[i].dataset.abstract;
        }

    }
    var hrefToHomepage = document.getElementsByClassName("author");
    for (let i = 0; i < hrefToHomepage.length; i++) {
        const e = hrefToHomepage[i];
        e.onclick = function() {
            localStorage.page_userid = e.dataset._id;
        }
    }
}