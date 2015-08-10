class App.Controller extends Backbone.Router

  initialize: (options) ->
    @$app_container = $("#app-container")
    @timesheets = new App.Collections.TimeSheets
    @$spinner =  $(".spinner-overlay")
    Backbone.history.start({pushState: true})


  _render_layout: (layoutKlass, options={}) ->
    if @_current_layout && @_current_layout instanceof layoutKlass
      console.log "layout cached"
    else
      options.app = this
      options.wrapper = @$app_container
      @_current_layout = new layoutKlass options

  _render_content: (viewKlass, options={}) ->
    options.app = this
    options.wrapper ||= @_current_layout.$content_area
    @_current_view = new viewKlass options

  show_spinner: ->
    @$spinner.addClass("show-spinner")

  hide_spinner: ->
    @$spinner.removeClass("show-spinner")


  routes:
    ""                  : "new_timesheet"
    "timesheets/new"    : "new_timesheet"

  new_timesheet: ->
    @_render_layout App.Views.TimeSheetLayout
    @_render_content App.Views.NewTimeSheetView









