class App.Views.NewTimeSheet.HeaderView extends App.View


  initialize: (options={}) ->
    @_render()
    @_position()


  _render: ->
    @$el.html  _.template(@tpl_string)

  _position: ->
    @$wrapper.html @el


  tpl_string:
    '
      <div class="row">
        <div class="small-12 columns">
          <span class="title">Submit TimeSeet</span>
        </div>
      </div>
    '