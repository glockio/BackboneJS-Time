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
    @model.set("email", "greg@testing!")

    tpl = _.template $("#submitted-template").html()
    @$el.html tpl @model.toJSON()


  _position: ->
    @$wrapper.html @el



  tpl_string:
    '

      <div class="success-wrapper">

        <span class="success-icon"></span>
        <div class="message">
          <div class="">
            Thank you <span> <%= 2+4 %></span>
          </div>

          <div class="details">
            You have logged 12 hours and 15 mins of work today
          </div>
        </div>
      </div>

    '

