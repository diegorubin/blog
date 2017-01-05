function UserForm() {
  var _this = this;

  _this.init = function(form) {
    _this.notification = new Notification();
    _this.validator = new FormValidator();

    _this.notification.init();
    _this.validator.init(form, function() {
      _this.notification.showErrors(_this.validator.errors);
    });
  }

}

