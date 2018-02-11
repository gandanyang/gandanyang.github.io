window.onload = function() {
        if (localStorage.token == undefined) {
            alert("登陆已失效，请重新登陆！");
            window.location.href = "register&login.html";
        }
        ifLoged();
        document.getElementById("clickUpload").onclick = function() {
            uploadPicPreview("fileHiden", "localImage", "preview");
            document.getElementById("localImage").classList.remove("nophoto");
        }
        var proIndex;
        var disIndex;
        var cityIndex;
        var signIndex;
        document.getElementById("localImage").src = url_file + localStorage.avatar;
        // 加载原有头像
        var province = document.getElementById('province');
        //省级资源选项加载
        // 动态加载星座
        var signNode = document.getElementById("signSelect");
        ajaxXHR('GET', url + "constellations/query", function(data) {
            var datac = data.data.constellations;
            var opt = "";
            opt += "<option>---请选择---</option>";
            for (var i = 0; i < datac.length; i++) {
                opt += '<option data-id="' + datac[i] + '" value="' + datac[i] + '">';
                opt += datac[i];
                opt += '</option>';
            }
            signNode.insertAdjacentHTML('afterbegin', opt);
        })
        signNode.onchange = function() {
            signSelect = signNode.options[signNode.selectedIndex].value;
        }
        ajaxXHR("GET", url + "city/province", function(data) {
            if (data.code != 'SUCCESS') {
                province.insertAdjacentHTML('afterbegin', '<option>无法加载城市信息请刷新重试！</option>');
                return;
            }
            var datap = data.data.province;
            var opt = "";
            opt += "<option>---请选择---</option>";
            for (var i = 0; i < datap.length; i++) {
                opt += '<option data-id="' + datap[i].ProID + '" value="' + datap[i].ProID + '">';
                opt += datap[i].name;
                opt += '</option>';
            }
            province.insertAdjacentHTML('afterbegin', opt);
        });
        // 绑定onchange 事件

        province.onchange = function getCity() {
            // dataset存储相应数据
            if (document.getElementById("city") != null) {
                this.parentNode.removeChild(document.getElementById("city"));
            }
            if (document.getElementById("area") != null) {
                this.parentNode.removeChild(document.getElementById("area"));
            }
            // 清除后置选项
            //获取当前选择的省/市 对应id

            proIndex = province.options[province.selectedIndex].value;
            console.log(proIndex);
            var str = '<select id="city" class="form-control">'
            ajaxXHR('GET', url + "city/city?ProID=" + proIndex, function(data) {
                if (data.code != "SUCCESS") {
                    // str += '<select class="form-control">请求失败</select>';

                }
                // console.log(proIndex);
                var datap = data.data.city;
                str += "<option>---请选择---</option>";
                for (var i = 0; i < datap.length; i++) {
                    str += '<option data-id="' + datap[i].CityID + '" value="' + datap[i].CityID + '">';
                    str += datap[i].name;
                    str += '</option>';
                }
                // loadList(datap, str, "city");
                str += '</select>';
                province.insertAdjacentHTML('afterend', str);
                //传入 数据集 输出字符串 加载数据集类型
                var cityNode = document.getElementById("city")
                cityNode.onchange = function getArea() {
                    if (document.getElementById("area") != null) {
                        console.log("area this" + this);
                        this.parentNode.removeChild(document.getElementById("area"));
                    }
                    cityIndex = cityNode.options[cityNode.selectedIndex].value;

                    console.log(cityIndex);
                    var str = '<select id="area" class="form-control">'
                    ajaxXHR('GET', url + "city/area?CityID=" + cityIndex, function(data) {
                        if (data.status != 200) {
                            // str += '<select class="form-control">请求失败</select>';
                        }

                        var datap = data.data.area;
                        str += "<option>---请选择---</option>";
                        for (var i = 0; i < datap.length; i++) {
                            str += '<option data-id="' + datap[i].Id + '" value="' + datap[i].Id + '">';
                            str += datap[i].DisName;
                            str += '</option>';
                        }
                        // loadList(datap, str, "city");
                        str += '</select>';
                        cityNode.insertAdjacentHTML('afterend', str);
                        areaNode = document.getElementById("area");
                        areaNode.onchange = function() {
                            disIndex = areaNode.options[areaNode.selectedIndex].value;
                        }
                    })

                }
            })
        }
        document.getElementById('submit').onclick = function() {
            var upwd = document.querySelector('#password').value;
            if (upwd == "") {
                alert("请输入密码");
            } else if (upwd == localStorage.pwd) {
                // var Readder=dataURItoBlob(Readder1);
                var choice = "";
                // 获取用户选择的性别   *****需要在点击提交时候来判断用户选择
                var getSex = document.querySelectorAll('#user-sex-select input');
                for (var j = 0; j < getSex.length; j++) {
                    if (getSex[j].checked) {
                        choice = getSex[j].value;
                        console.log("选择的性别为：" + choice);
                    }
                }
                var formData = new FormData();
                var region = ["[" + proIndex, cityIndex, disIndex + "]"]; //获取所选中的省市区
                console.log(region);
                var uName = document.getElementById('userName').value;
                var token = localStorage.token;
                userName = uName;
                formData.append("token", token);
                formData.append("avatar", imgReader);
                formData.append("gender", choice);
                formData.append("city", region);
                formData.append("constellation", signSelect);
                formData.append("name", uName);
                postXHR('POST', url + 'account/profile', function(data) {
                    // var getSex = document.getElementById('create_user_sex_rig');       

                    // window.localStorage.href="ArticleList.html";
                    //保存用户信息
                    localStorage.token = data.data.user.token;
                    localStorage.avatar = data.data.user.avatar;
                    localStorage.gander = data.data.user.gander;
                    localStorage.name = data.data.user.name;
                    localStorage.constellation = data.data.constellations;
                    localStorage.cityname = cityNode.options[cityNode.selectedIndex].text;
                    if (data.code == "SUCCESS") {
                        window.location.href = "passageList.html";
                    } else {
                        console.log(data);
                    }
                }, formData);
            } else {
                alert("密码错误");
                return false;
            }

        }
    }
    // function loadList(data, strx, type) {
    //     strx += "<option>---请选择---</option>";
    //     for (var i = 0; i < data.length; i++) {
    //         if (type == "province") {
    //             strx += '<option data-id="' + data[i].ProID + '" value="' + data[i].ProID + '>';
    //             strx += data[i].name;
    //         } else if (type == "city") {
    //             strx += '<option data-id="' + data[i].CityID + '" value="' + data[i].CityID + '">';
    //             strx += data[i].name;
    //         } else if (type == "county") {
    //             strx += '<option data-id=' + data[i].Id + '>';
    //             strx += data[i].DisName;
    //         }
    //         strx += '</option>';
    //     }
    // }



// 男女选择框点击事件
function ifMan() {
    document.getElementById("womanSelect").className = "";
    document.getElementById("manSelect").className = "checked";
}

function ifWoman() {
    document.getElementById("womanSelect").className = "checked";
    document.getElementById("manSelect").className = "";
}