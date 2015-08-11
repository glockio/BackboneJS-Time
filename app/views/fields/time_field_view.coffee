class App.Views.TimeFieldView extends App.Views.FormFieldView

  className: "hidden-focus-label field-wrapper"

  initialize: (options={})->
    @_render()
    @_position()
    @time = new App.Models.Time
    @model.time = @time
    @$time_input = @$("#time-input")
    @$error_msg  = @$(".error-msg")

  events:
    "keyup": "request_validate_time"

  request_validate_time: ->
    @validate_with_delay @_validate_time

  _validate_time: =>
    @time.set_time_from_string  @$time_input.val()
    if @time.is_valid()
      @mark_as_valid_field()
      @_clear_errors()

    else
      @mark_as_invalid_field()
      @_render_errors()

  _render_errors: ->
    error_msg = @time.errors.shift()
    @$error_msg.html error_msg

  _clear_errors: ->
    @$error_msg.empty()

  reset: =>
    super
    @_clear_errors()

  tpl_string:
    '
      <input type="text"name="time" id=time-input>
      <label for="time">Time</label>
      <span class="ion-ios-checkmark-outline valid-icon"></span>
      <span class="error-msg">here</span>
    '




