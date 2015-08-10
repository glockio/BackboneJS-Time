class App.Views.TimeFieldView extends App.Views.FormFieldView

  initialize: (options)->
    @_render()
    @_position()

  className: "time-field"

  tpl_string:
    '
      <label for="time">Time</label>
      <input type="text"name="time">
    '
