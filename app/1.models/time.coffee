class App.Models.Time extends Backbone.Model

  NUMBER_REGEX: /^\d+$/

  set_time_from_string: (time_string) ->
    @errors = []
    time_string = time_string.replace(/\s/g, "")
    time_arry = time_string.split(":")

    switch time_arry.length
      when 2
        @_set_hour time_arry[0]
        @_set_min  time_arry[1]
      when 1
        @_set_hour time_arry[0]
      else
        @errors.push "Invalid Format try 07:00"

  _set_hour: (hour)->
    @errors.push "Hour must be number" unless @NUMBER_REGEX.test(hour)
    @set "hour", hour

  _set_min: (min) ->
    @errors.push "Mintue must be number" unless @NUMBER_REGEX.test(min)
    @errors.push "Mintue over 59" if (min*1) > 59
    @set "min", min

  is_valid: ->
    !@errors.length




