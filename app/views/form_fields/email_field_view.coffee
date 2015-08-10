class App.Views.EmailFieldView extends App.Views.FormFieldView

  EMAIL_REGEX: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i

  className: "hidden-focus-label"
  initialize: (options)->
    console.log "rneder eail!!!"
    @_render()
    @_position()
    @$email = @$("#email")
    @has_invalid_class = false
    @has_success_class = false

  events:
    "keyup": "validate_email"
    "focusin" : "hide_label"
    "focusout" : "show_label"
    "focus"    : "focus_e"



  validate_email: ->
    if @EMAIL_REGEX.test @$email.val()
      @$el.addClass "valid-field"
      @$el.removeClass "invalid-field"
      @has_invalid_class = false
      @has_success_class =  true
    else
      @$el.addClass "invalid-field" unless @has_invalid_class
      @$el.removeClass if @has_success_class
      @has_success_class = false


  tpl_string:
    '
      <input type="text" name="email" id="email">
      <label for="email">Email!</label>
     '
