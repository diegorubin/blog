function Notification() {
  var _this = this;

  _this.init = function() {
  };

  _this.showErrors = function(errors) {

    for (var name in errors) {
      var messages = errors[name];
      var wrap = document.getElementsByName(name)[0].parentNode;

      var previousNotification = document.getElementById(name + '-error');
      if (previousNotification) {
        previousNotification.remove();
      }

      var span = document.createElement('span');
      span.setAttribute('class', 'field-error');
      span.setAttribute('id', name + '-error');
      span.innerHTML = messages.join(', ');

      wrap.appendChild(span);
    }
    
  }
}

