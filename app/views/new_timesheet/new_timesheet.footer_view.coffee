class App.Views.NewTimeSheet.FooterView extends App.View

  initialize: (options={}) ->
    @_render()
    @_position()

  events:
    "click #clear" : "clear_form"
    "click #next" : "submit_form"

  clear_form: ->
    @parent.$el.trigger "clear_form", this

  submit_form: ->
    @parent.$el.trigger "submit_form", this


  _render: ->
    @$el.html  _.template(@tpl_string)

  _position: ->
    @$wrapper.html @el


  tpl_string:
    '
      <div class="row">
        <div class="small-6 columns">
          <div id="clear"class="action">Clear</div>
        </div>
        <div class="small-6 columns">
          <div id="next" class="action">Next</div>
        </div>
      </div>
    '