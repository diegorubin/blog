function FormValidator() {
  var _this = this;

  _this.init = function(form) {
    _this.form = document.getElementById(form);
  };

  _this.isValid = function() {
    return _this._checkInputs();
  };

  _this._checkInputs = function() {
    var valid = true;
    var inputs = document.getElementsByTagName('input');
    for (var idx in inputs) {
      var input = inputs[idx];
      valid = valid && _this._checkInput(input.getAttribute('data-validation-type'), input);
    }
    return valid;
  };

  _this._checkInput = function(validationType, input) {
    if (validationType) {
      return _this[validationType](input);
    }
    return true;
  }

  _this.email = function(input) {
    var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(input.value);
  }

  _this.confirmation = function(input) {
    var originalInput = document.getElementById(input.getAttribute('data-validation-equals'));
    return originalInput.value === input.value;
  }

}

