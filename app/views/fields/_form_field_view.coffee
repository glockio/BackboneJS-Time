class App.Views.FormFieldView extends App.View

  has_invalid_class: false
  has_success_class: false
  validation_delay: 600

  _render: ->
    @$el.html _.template(@tpl_string)

  _position: ->
    @$wrapper.html @el

  mark_as_valid_field: (options={}) ->
    $target = options.target || @$el
    $target.addClass "valid-field"
    $target.removeClass "invalid-field"
    @has_invalid_class = false
    @has_success_class =  true
    @validation_delay = 600 # give user time to correct field

  mark_as_invalid_field: (options={}) ->
    $target = options.target || @$el
    $target.addClass "invalid-field" unless @has_invalid_class
    $target.removeClass if @has_success_class
    @has_success_class = false
    @validation_delay = 0 #want to give feedback the second it becomes valid

  validate_with_delay: (validator) ->
    clearTimeout @validation_countdown
    @validation_countdown = setTimeout(validator, @validation_delay)

  reset: =>
    @$el.removeClass "invalid-field"
    @$el.removeClass "valid-field"
    has_invalid_class =  false
    has_success_class =  false
    validation_delay  =  600