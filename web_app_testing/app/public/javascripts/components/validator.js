function FormValidator() {
  var _this = this;
  _this.errors = {};

  _this.init = function(form, callback) {
    _this.form = document.getElementById(form);
    _this.form.onsubmit = function() {
      var result = _this.isValid();
      if (!result && callback) {
        callback(); 
      }
      return result;
    };
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

  _this.addError = function(fieldName, content) {
    _this.errors[fieldName] = _this.errors[fieldName] || [];
    _this.errors[fieldName].push(content);
  }

  _this.email = function(input) {
    var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var result = emailPattern.test(input.value);

    if (!result) {
      _this.addError(input.getAttribute('name'), 'email.invalid');
    }

    return result;
  }

  _this.confirmation = function(input) {
    var originalInput = document.getElementById(input.getAttribute('data-validation-equals'));
    var result = originalInput.value === input.value;
    if (!result) {
      _this.addError(input.getAttribute('name'), 'confirmation.notEqual');
    }
    return result;
  }

}

