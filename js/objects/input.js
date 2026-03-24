
function Input() {
  this._element = $(
    '<div class="form-group">' +
      '<label></label>' +
      '<div class="input-group">' +
        '<input type="text" class="form-control" />' +
        '<div class="invalid-feedback"></div>' +
      '</div>' +
    '</div>'
  )[0];
}

Input.prototype.element = function () {
  return this._element;
};

Input.prototype.setLabel = function (label) {
  var $element = $(this.element());
  $element.find('label').text(label);
};

Input.prototype.setPlaceholder = function (placeholder) {
  var $element = $(this.element());
  $element.find('input').attr('placeholder', placeholder);
};

Input.prototype.setErrorMessage = function (message) {
  var $element = $(this.element());
  $element.find('.invalid-feedback').text(message);
  $element.find('input').addClass('is-invalid');
};

Input.prototype.clearErrorMessage = function () {
  var $element = $(this.element());
  $element.find('.invalid-feedback').text('');
  $element.find('input').removeClass('is-invalid');
};

Input.prototype.setMask = function (mask) {
  var $element = $(this.element());
  $element.find('input').mask(mask);
};

Input.prototype.clearMask = function () {
  var $element = $(this.element());
  $element.find('input').unmask();
};

//

function InputFactory() { }

InputFactory.prototype.newTelefoneFixo = function () {
  var input = new Input();
  input.setLabel('Telefone Fixo');
  input.setPlaceholder('(00) 0000-0000');
  input.setMask('(00) 0000-0000');
  return input;
};

InputFactory.prototype.newTelefoneCelular = function () {
  var input = new Input();
  input.setLabel('Telefone Celular');
  input.setPlaceholder('(00) 00000-0000');
  input.setMask('(00) 00000-0000'); 
  return input;
};

