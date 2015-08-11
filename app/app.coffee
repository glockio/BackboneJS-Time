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

    @_current_layout #output

  _render_content: (viewKlass, options={}) ->
    options.app = this
    options.wrapper ||= @_current_layout.$content_area
    @_current_view = new viewKlass options

  show_spinner: ->
    @$spinner.addClass("show-spinner")

  hide_spinner: ->
    @$spinner.removeClass("show-spinner")


  set_transit_state: (state, options={}) =>
    console.log "caing set transit_states"

    state_handler = @[@transit_states[state]]
    state_handler.apply(this, [options]) if state_handler instanceof Function


  routes:
    ""                    : "new_timesheet"
    "timesheets/new"      : "new_timesheet"
    "timesheet/submitted" : "new_timesheet" #if used refreshed on transit state sent here

  transit_states:
    "timesheet/submitted" : "submitted_timesheet"

  new_timesheet: ->
    layout = @_render_layout App.Views.TimeSheetLayout
    @_render_content App.Views.NewTimeSheetView, layout: layout

  submitted_timesheet:(options) ->
    @navigate "timesheet/submitted"
    layout = @_render_layout App.Views.TimeSheetLayout
    options.layout = layout
    @_render_content App.Views.SubmittedTimeSheetView, options








