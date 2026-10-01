
function Agerio_Solicitacao() {
  this._bs_helper = new BS_Helper();
  this._element =
    '<div>' +
      this._bs_helper.create_input_html() +
      this._bs_helper.create_input_html() +
      this._bs_helper.create_input_html() +
      this._bs_helper.create_input_html() +
    '</div>'
  ;
}