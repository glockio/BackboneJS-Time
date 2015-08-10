class App.View extends Backbone.View

  constructor: (options={}) ->
    @app = options.app if options.app
    @parent = options.parent if  options.parent
    @$wrapper = options.wrapper if options.wrapper
    super