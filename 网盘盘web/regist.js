var app = new Vue({
  el: '#app',
  data: {
    username: '',
    password: '',
    code: ''
  },
  methods: {
    toRegister() {
      //创建异步对象  
      var xhr = new XMLHttpRequest();
      //设置请求的类型及url
      xhr.open('post', 'http://network.vip3gz.idcfengye.com/regist');
      //post请求一定要添加请求头才行不然会报错
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      //发送请求
      xhr.send('username=' + this.username + '&password=' + this.password + '&code=' + this.code  );
      xhr.onreadystatechange = function () {
        // 这步为判断服务器是否正确响应
        if (xhr.readyState == 4 && xhr.status == 200) {
          let resp = JSON.parse(xhr.response);
          if (!resp.success) {
            alert(resp.msg);
          } else {
            window.location.href = "catalog.html"
          }
        }
      };
    }
    
  }
})