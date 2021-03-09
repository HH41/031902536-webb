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
    uploadFile:function(){
      let formData = new FormData();
      formData.append('file', this.file.raw);
      formData.append('parentFolderId',this.currentFolderId);
      formData.append('path','');
      var nfder = new XMLHttpRequest();
      nfder.open('post', 'http://network.vip3gz.idcfengye.com/upload');
      nfder.setRequestHeader( "Content-Type"," multipart/form-data; boundary=WebKitFormBoundaryLjuSeKUvfFP85rME");
      nfder.send(formData);
      //nfder.send('&file=' + formData +'&parentFolderId=' + this.currentFolderId + '&path=""' );
      nfder.onreadystatechange = (data) => {
       if (nfder.readyState == 4 && nfder.status == 200)  {
         let resp = JSON.parse(nfder.response);
         if (resp.success) { 
           this.viewmenu(this.currentFolderId);
         }
        }
      }
    },
   
    openInput: function () {
      this.$prompt('请输入文件夹名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator: /\s*\S+?/,
        inputErrorMessage: '文件夹名称不能为空'
      }).then(({ value }) => {
        
        this.newfolder(value);
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    newfolder: function (value){
      var nfder = new XMLHttpRequest();
      nfder.open('post', 'http://network.vip3gz.idcfengye.com/addFolder');
      nfder.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      nfder.withCredentials=true;
      nfder.send('folderName=' + value +'&parentFolderId='+this.currentFolderId);
      nfder.onreadystatechange = (data) => {
       if (nfder.readyState == 4 && nfder.status == 200)  {
         if(this.myType='file'){
           this.fviewmenu(this.currentFolderId);
         };
         let resp = JSON.parse(nfder.response);
         if (resp.success) { 
           this.viewmenu(this.currentFolderId);
         }
        }
      }
    },
    toCurrentFolder(item, index) {
      this.currentFolderId = item.id;
      this.viewmenu(item.id);
      this.toNextList.splice(index+1, this.toNextList.length);
    },
    opensee(rowData){
      this.currentFolderId =rowData.id;
      this.toNextList.push({ id: rowData.id, name: rowData.name});
      this.viewmenu(rowData.id);
    },
    viewmenu(folderId){
      if (folderId === undefined) {
        folderId = 0;
      }
      var nfder = new XMLHttpRequest();
      nfder.open('post', 'http://network.vip3gz.idcfengye.com/view');
      nfder.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      nfder.send('&parentFolderId='+folderId+'&current=1&pageSize=10');
      nfder.onreadystatechange = (data) => {
       if (nfder.readyState == 4 && nfder.status == 200) {
        let resp = JSON.parse(nfder.response);
        if (resp.success) { 
          this.tableData=resp.data.page.items;
          this.pageTotalCount=resp.data.page.pageTotalCount;
        }}}
    }, 
    fviewmenu(folderId){
      if (folderId === undefined) {
        folderId = 0;
      }
      var nfder = new XMLHttpRequest();
      nfder.open('post', 'http://network.vip3gz.idcfengye.com/fileInfo');
      nfder.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      nfder.send('&fileId='+folderId+'&current=1&pageSize=10');
      nfder.onreadystatechange = (data) => {
       if (nfder.readyState == 4 && nfder.status == 200) {
        let resp = JSON.parse(nfder.response);
        if (resp.success) { 
          this.tableData=resp.data.page.items;
          this.pageTotalCount=resp.data.page.pageTotalCount;
        }}}
    },

   
    changePage(curPage){
      var ncpg = new XMLHttpRequest();
      ncpg.open('post', 'http://network.vip3gz.idcfengye.com/view');
      ncpg.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      ncpg.send('&parentFolderId=0' + '&current='+ curPage + '&pageSize=10');
      ncpg.onreadystatechange = (data) => {
       if (ncpg.readyState == 4 && ncpg.status == 200) {
        let resp = JSON.parse(ncpg.response);
        if (resp.success) { 
          this.tableData=resp.data.page.items;
        }}}
    },
    
    handleExceed: function (file) {
      this.file = file;
      let fileSize = file.size;
      // 设置单位是B/KB/M
      let sizeUnit = 'B';
      if (fileSize >= 1000 && fileSize < 1000000) {
        sizeUnit = 'KB';
        fileSize = fileSize / 1000;
      } else if (fileSize >= 1000000 && fileSize < 1000000000) {
        sizeUnit = 'M';
        fileSize = fileSize / 1000000;
      } else if (fileSize >= 1000000000) {
        this.$message({
          type: 'warning',
          message: '图片大小不能超过1G'
        });
        return;
      } else {
        sizeUnit = 'B';
        fileSize = fileSize;
      }
      // fileSize要做一下四舍五入去小数点
      // this.tableData.push({ name: file.name, size: fileSize + sizeUnit, createTime: '-' })
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
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
    openRow(fileId){
      this.dialogTableVisible=true;
      this.curImg='http://network.vip3gz.idcfengye.com/download?fileId='+fileId;
    }
  }
})
