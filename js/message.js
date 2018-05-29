// MVC
! function () {
  var model = Model({
    resourceName: 'Message'
  })

  var view = View('section.message')

  var controller = Controller({
    messageList: null,
    init: function (view, model) {
      this.form = this.view.querySelector('#postMessageForm')
      this.name = this.view.querySelector('#postMessageForm input[name=name]')
      this.content = this.view.querySelector('#postMessageForm input[name=content]')
      this.messageList = this.view.querySelector('#messageList')
      this.loadMessages()
    },
    bindEvents: function () {
      var _this = this
      this.form.addEventListener('submit', function (e) {
        e.preventDefault()
        _this.saveDataAndUpdatePage();
      })
    },
    loadMessages: function () {
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
    saveDataAndUpdatePage: function () {
      let name = this.name.value
      name = name === '' ? '匿名用户' : name
      let content = this.content.value
      if (content === '') {
        return
      }
      this.model.save({
        'name': name,
        'content': content
      }).then((object) => {
        this.updateMessageToPage(object.attributes)
        this.content.value = ''
      })
    },
    updateMessageToPage: function (item) {
      var li = document.createElement('li')
      li.innerText = item.name + ': ' + item.content
      this.messageList.insertBefore(li, this.messageList.children[0])
    }
  })
  controller.init(view, model)
}()