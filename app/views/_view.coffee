class App.View extends Backbone.View

  constructor: (options={}) ->
    @app = options.app
    @parent = options.parent
    @$wrapper = options.wrapper
    @layout   = options.layout
    @_init_layout_sections() if @layout && @render_sections
    super

  _init_layout_sections: ->
    App.Views[@NameSpace].HeaderView
    @_init_header() if App.Views[@NameSpace].HeaderView
    @_init_footer() if App.Views[@NameSpace].FooterView

  _init_footer: ->
    @footer_view = new App.Views[@NameSpace].FooterView parent: this, app: @app, wrapper: @layout.$footer_section

  _init_header: ->
    @header_view = new App.Views[@NameSpace].HeaderView parent: this, app: @app, wrapper: @layout.$header_section

