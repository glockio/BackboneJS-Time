class App.Views.NewTimeSheetView extends App.View

  dynamic_fields: [
    {wrapper_prefix: "email", view_name: "EmailFieldView" },
    {wrapper_prefix: "time", view_name: "TimeFieldView" },
    {wrapper_prefix: "work-type", view_name: "WorkTypeFieldView" }
  ]

  initialize: (options)->
    @model = new App.Models.TimeSheet
    @_render()
    @_position()
    @_render_fields()

  _render: ->
    @$el.html _.template(@tpl_string)

  _position: ->
    @$wrapper.html @el

  _render_fields: ->
    _(@dynamic_fields).each (field) => # need to bind this here
      new App.Views[field.view_name] app: @app, parent: this, wrapper: @$("##{field.wrapper_prefix}-wrapper")


  tpl_string:
    '
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
         <input type="text" for="message" name="message">
       </div>
     </div>

     <div class="row">

       <div class="small 12 columns">
         <div id="work-type-wrapper"></div>
       </div>
     </div>
    '