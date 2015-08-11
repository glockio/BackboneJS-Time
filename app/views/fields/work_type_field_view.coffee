class App.Views.WorkTypeFieldView extends App.Views.FormFieldView

  select_options: [
    {key: "THis Is a Key", value: "This is a value"},
    {key: "THis is another Key", value: "This is an another value"}
  ]

  initialize: (options)->
    @_render()
    @_position()
    @_render_select_options()

  _render: ->
    @$el.html _.template(@tpl_string)
    @$select_box = @$("#work-type")

  _render_select_options: ->
    _(@select_options).each (option) =>
      @$select_box.append new Option option.key, option.value

  tpl_string:
    '
      <label> Work Type Select</label>
      <select name="work_type" id="work-type">
      </select>
    '

