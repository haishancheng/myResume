/* ---使用-----
var model = Model({resourceName: 'xxx'})
model.init()
model.fetch()
model.save({name: 'xxx', content: 'xxx'})
--------------*/

window.Model = function (options) {
  let resourceName = options.resourceName
  return {
    init: function () {
      var APP_ID = '6SarUhW3BJWJQmbnCHj6QhcS-gzGzoHsz';
      var APP_KEY = 'zAPO6ONaEYAzeMzDp6H7vIOh';
      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      });
    },
    fetch: function () {
      var query = new AV.Query(resourceName)
      return query.find() //返回一个promise对象
    },
    save: function (object) {
      var Message = AV.Object.extend(resourceName);
      var message = new Message();
      return message.save(object) //返回一个promise对象
    }
  }
}