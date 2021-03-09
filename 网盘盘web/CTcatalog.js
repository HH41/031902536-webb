var app = new Vue({
    el: '#app',
    data: {
      showModal: false,
      inputValue: '',
      username: '',
      password: '',
      tableData: [],
      pageTotalCount:0,
      currentFolderId:0,
      toNextList: [{id:0, name: '顶层'}],
      uploadData: {},
      file: null,
      dialogTableVisible: false,
      curImg: ''
    },
    mounted () {
      this.viewmenu();
    },
    methods: {
      openRow(fileId){
        this.dialogTableVisible=true;
        this.curImg='http://network.vip3gz.idcfengye.com/download?fileId='+fileId;
      },
        viewmenu(fileId){
            if (fileId === undefined) {
                fileId = 0;
            }
            var nfder = new XMLHttpRequest();
            nfder.open('post', 'http://network.vip3gz.idcfengye.com/show');
            nfder.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            nfder.send('&current=1&pageSize=10');
            nfder.onreadystatechange = (data) => {
             if (nfder.readyState == 4 && nfder.status == 200) {
              let resp = JSON.parse(nfder.response);
              if (resp.success) { 
                this.tableData=resp.data.page.list;
                this.pageTotalCount=resp.data.page.total;
              }}}
          }, 
        changePage(curPage){
            var ncpg = new XMLHttpRequest();
            ncpg.open('post', 'http://network.vip3gz.idcfengye.com/show');
            ncpg.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ncpg.send( '&current='+ curPage + '&pageSize=10');
            ncpg.onreadystatechange = (data) => {
             if (ncpg.readyState == 4 && ncpg.status == 200) {
              let resp = JSON.parse(ncpg.response);
              if (resp.success) { 
                this.tableData=resp.data.page.list;
              }}}
          },
          deleteRow(fileId,index) {
            var ncpg = new XMLHttpRequest();
            ncpg.open('post', 'http://network.vip3gz.idcfengye.com/delete');
            ncpg.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ncpg.send( '&fileId='+ fileId);
            ncpg.onreadystatechange = (data) => {
             if (ncpg.readyState == 4 && ncpg.status == 200) {
              let resp = JSON.parse(ncpg.response);
              if (resp.success) { 
                this.tableData.splice(index, 1);
              }}}
          },
          passRow(fileId,index){
            var ncpg = new XMLHttpRequest();
            ncpg.open('post', 'http://network.vip3gz.idcfengye.com/pass');
            ncpg.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ncpg.send( '&fileId='+ fileId);
            ncpg.onreadystatechange = (data) => {
             if (ncpg.readyState == 4 && ncpg.status == 200) {
              let resp = JSON.parse(ncpg.response);
              if (resp.success) { 
                this.tableData.splice(index, 1);
              }}}
          },
          cancelID:function(){
            var canc = new XMLHttpRequest();
            canc.open('get', 'http://network.vip3gz.idcfengye.com/logout');
            canc.send();
            canc.onreadystatechange = function (data) {
             if (canc.readyState == 4 && canc.status == 200) {
                alert('注销完成！');
                window.location.href = "web.html"}}
          },
          
        }})