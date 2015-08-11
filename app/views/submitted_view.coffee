class App.Views.SubmittedTimeSheetView extends App.View

  className:"submitted-timesheet"
  render_sections: true
  NameSpace: "Submitted"

  initialize: (options) ->
    @model = options.model
    @_render()
    @_position()

  events:
    "new_timesheet" : "new_timesheet"

  new_timesheet: (e, view) ->
    @app.navigate "timesheets/new", trigger: true

  _render: ->
    data = @model.toJSON()
    data.hour = @model.time.get("hour")
    data.min  = @model.time.get("min")

    tpl = _.template $("#submitted-template").html()
    @$el.html tpl data

  _position: ->
    @$wrapper.html @el
