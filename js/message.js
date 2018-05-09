// MVC
! function() {
  var view = document.querySelector('section.message')

  //数据相关
  var model = {
    init: function() {
      var APP_ID = '6SarUhW3BJWJQmbnCHj6QhcS-gzGzoHsz';
      var APP_KEY = 'zAPO6ONaEYAzeMzDp6H7vIOh';
      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      });
    },
    //获取数据
    fetch: function() {
      var query = new AV.Query('Message')
      return query.find() //返回一个promise对象
    },
    //创建数据
    save: function(name, content) {
      var Message = AV.Object.extend('Message');
      var message = new Message();
      return message.save({
          'name': name,
          'content': content
        }) //返回一个promise对象
    }
  }

  var controller = {
    view: null,
    model: null,
    messageList: null,
    init: function(view, model) {
      this.view = view
      this.model = model
      this.form = this.view.querySelector('#postMessageForm')
      this.name = this.view.querySelector('#postMessageForm input[name=name]')
      this.content = this.view.querySelector('#postMessageForm input[name=content]')
      this.messageList = this.view.querySelector('#messageList')
      this.model.init()
      this.loadMessages()
      this.bindEvents()
    },
    bindEvents: function() {
      var _this = this
      this.form.addEventListener('submit', function(e) {
        e.preventDefault()
        _this.saveDataAndUpdatePage();
      })
    },
    loadMessages: function() {
      //箭头函数中的this等于外面的this
      this.model.fetch().then((messages) => {
        var data = messages.map((item) => item.attributes)
        data.forEach((item) => {
          this.updateMessageToPage(item)
        })
      }, (error) => {
        // 异常处理
      })
    },
    saveDataAndUpdatePage: function() {
      let name = this.name.value
      name = name === '' ? '匿名用户' : name
      let content = this.content.value
      if (content === '') { return }
      this.model.save(name, content).then((object) => {
        this.updateMessageToPage(object.attributes)
        this.content.value = ''
      })
    },
    updateMessageToPage: function(item) {
      var li = document.createElement('li')
      li.innerText = item.name + ': ' + item.content
      this.messageList.insertBefore(li, this.messageList.children[0])
    }
  }
  controller.init(view, model)
}()