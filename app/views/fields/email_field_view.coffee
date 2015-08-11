class App.Views.EmailFieldView extends App.Views.FormFieldView

  EMAIL_REGEX: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i

  className: "hidden-focus-label"

  initialize: (options)->
    @_render()
    @_position()
    @$email_input = @$("#email-input")

  events:
    "keyup": "request_validate_email"

  request_validate_email: ->
    @validate_with_delay @_validate_email

  _validate_email: =>
    if @EMAIL_REGEX.test @$email_input.val()
      @mark_as_valid_field()
    else
      @mark_as_invalid_field()





  tpl_string:
    '
      <input type="text" name="email" id="email-input">
      <label for="email">Email!</label>
     '
