class App.Views.Submitted.FooterView extends App.View

  initialize: (options={}) ->
    @_render()
    @_position()


  events:
    "click #new-timesheet" : "new_timesheet"

  new_timesheet: ->
    @parent.$el.trigger "new_timesheet"
  _render: ->
    @$el.html  _.template(@tpl_string)


  _position: ->
    @$wrapper.html @el


  tpl_string:
    '
      <div class="row">
        <div class="small-12 columns">
          <div class="action" id="new-timesheet">
            Start Again
          </div>
        </div>
      </div>
    '