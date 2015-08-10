class App.Views.TimeSheetLayout extends Backbone.View

  initialize: (options)->
    @$wrapper = options.wrapper
    @_render()
    @_position()

  _render: ->
    @$el.html _.template(@tpl_string)
    @$footer_section = @$("#footer-section")
    @$header_section = @$("#header-section")
    @$content_area   = @$("#content-area")

  _position: ->
    @$wrapper.html @el

  tpl_string:
    '
      <div class="row">
        <div class="small-12 columns "id="header-section">
          Header Section
        </div>
      </div>

      <div class="row">
        <div class="small-12 columns" id="content-area">
          Header Section
        </div>
      </div>

      <div class="row">
        <div class="small-12 columns "id="footer-section">
          Footer
        </div>
      </div>
    '