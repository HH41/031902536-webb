var app = new Vue({
    el: '#app',
    data: {
      username: '',
      password: '',
    },
    methods: {
        toLogin: function () {
            //步骤一:创建异步对象
            var ajax = new XMLHttpRequest();
            //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
            ajax.open('post', 'http://network.vip3gz.idcfengye.com/login');
            ajax.withCredentials = true;
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            //步骤三:发送请求
            ajax.send('&username=' + this.username + '&password=' + this.password);
            //步骤四:注册事件 onreadystatechange 状态改变就会调用
            ajax.onreadystatechange = function (data) {
              if (ajax.readyState == 4 && ajax.status == 200) {
                let respon = JSON.parse(ajax.response);
                if (!respon.success) {
                  alert(respon.msg);
                } else {
                  window.location.href = "catalog.html"
                }
                //步骤五 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的　　　　console.log(nfder.responseText);//输入相应的内容  　　}
              }
            }
          },

      toRegist() {
        window.location.href = "register.html"
      },
      toController(){
        window.location.href = "controller.html"
      }
        }
    })