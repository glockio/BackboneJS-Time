class App.Views.FormFieldView extends App.View

  _render: ->
    @$el.html _.template(@tpl_string)

  _position: ->
    @$wrapper.html @el

