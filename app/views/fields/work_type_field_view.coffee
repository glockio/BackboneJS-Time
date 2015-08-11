class App.Views.WorkTypeFieldView extends App.Views.FormFieldView

  className: "hidden-focus-label field-wrapper work-type-wrapper"

  select_options: [
    {key: "Time working on visual effects for a movie", value: "Time working on visual effects for a movie"},
    {key: "Time spent reviewing work of junior artist", value: "Time spent reviewing work of junior artist"}
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

      <select name="work_type" id="work-type">
      </select>
      <label id="work-type-label"> Work Type Select</label>
    '

