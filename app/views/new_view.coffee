class App.Views.NewTimeSheetView extends App.View

  dynamic_fields: [
    {wrapper_prefix: "email", view_name: "EmailFieldView" },
    {wrapper_prefix: "time", view_name: "TimeFieldView" },
    {wrapper_prefix: "work-type", view_name: "WorkTypeFieldView" }
  ]

  render_sections: true
  NameSpace: "NewTimeSheet"

  initialize: (options) ->
    @model = new App.Models.TimeSheet
    @layout = options.layout
    @_render()
    @_position()
    @_render_fields()

  events:
    "submit_form" : "submit_timesheet"
    "clear_form" : "clear_form"

  clear_form: (e, view) ->
    @$form[0].reset()
    @model.reset()
    _(@dynamic_fields).each (field) => field.view.reset()


  submit_timesheet: (e, view) ->
    @app.show_spinner()

    callback = () =>
      @app.set_transit_state "timesheet/submitted", model: @model
      @app.hide_spinner()

    setTimeout callback , 1000



  _render: ->
    @$el.html _.template(@tpl_string)
    @$form = @$("#timesheet-form")

  _position: ->
    @$wrapper.html @el

  _render_fields: ->
    _(@dynamic_fields).each (field) => # need to bind this here
      view = new App.Views[field.view_name] app: @app, parent: this, wrapper: @$("##{field.wrapper_prefix}-wrapper")
      field.view = view

  tpl_string:
    '
    <form id="timesheet-form">
      <div class="row">
       <div class="medium-6 columns">
         <div id="email-wrapper"></div>
       </div>
       <div class="medium-6 columns">
         <div id="time-wrapper"></div>
       </div>
      </div>

      <div class="row" >
       <div class="small-12 columns">
         <textarea name="message" id="" cols="30" rows="10"></textarea>
         <input type="text" for="message" name="message" id="message">
       </div>
      </div>

      <div class="row">
        <div class="small 12 columns">
          <div id="work-type-wrapper"></div>
        </div>
      </div>
     </form>
    '

