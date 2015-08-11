(function() {
  window.App = {
    Models: {},
    Collections: {},
    Views: {
      NewTimeSheet: {},
      Submitted: {}
    }
  };

}).call(this);

(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  App.Controller = (function(superClass) {
    extend(Controller, superClass);

    function Controller() {
      this.set_transit_state = bind(this.set_transit_state, this);
      return Controller.__super__.constructor.apply(this, arguments);
    }

    Controller.prototype.initialize = function(options) {
      this.$app_container = $("#app-container");
      this.timesheets = new App.Collections.TimeSheets;
      this.$spinner = $(".spinner-overlay");
      return Backbone.history.start({
        pushState: true
      });
    };

    Controller.prototype._render_layout = function(layoutKlass, options) {
      if (options == null) {
        options = {};
      }
      if (this._current_layout && this._current_layout instanceof layoutKlass) {
        console.log("layout cached");
      } else {
        options.app = this;
        options.wrapper = this.$app_container;
        this._current_layout = new layoutKlass(options);
      }
      return this._current_layout;
    };

    Controller.prototype._render_content = function(viewKlass, options) {
      if (options == null) {
        options = {};
      }
      options.app = this;
      options.wrapper || (options.wrapper = this._current_layout.$content_area);
      return this._current_view = new viewKlass(options);
    };

    Controller.prototype.show_spinner = function() {
      return this.$spinner.addClass("show-spinner");
    };

    Controller.prototype.hide_spinner = function() {
      return this.$spinner.removeClass("show-spinner");
    };

    Controller.prototype.set_transit_state = function(state, options) {
      var state_handler;
      if (options == null) {
        options = {};
      }
      state_handler = this[this.transit_states[state]];
      if (state_handler instanceof Function) {
        return state_handler.apply(this, [options]);
      }
    };

    Controller.prototype.routes = {
      "": "new_timesheet",
      "timesheets/new": "new_timesheet",
      "timesheet/submitted": "new_timesheet"
    };

    Controller.prototype.transit_states = {
      "timesheet/submitted": "submitted_timesheet"
    };

    Controller.prototype.new_timesheet = function() {
      var layout;
      layout = this._render_layout(App.Views.TimeSheetLayout);
      return this._render_content(App.Views.NewTimeSheetView, {
        layout: layout
      });
    };

    Controller.prototype.submitted_timesheet = function(options) {
      var layout;
      this.navigate("timesheet/submitted");
      layout = this._render_layout(App.Views.TimeSheetLayout);
      options.layout = layout;
      return this._render_content(App.Views.SubmittedTimeSheetView, options);
    };

    return Controller;

  })(Backbone.Router);

}).call(this);

(function() {


}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  App.Models.Time = (function(superClass) {
    extend(Time, superClass);

    function Time() {
      return Time.__super__.constructor.apply(this, arguments);
    }

    Time.prototype.NUMBER_REGEX = /^\d+$/;

    Time.prototype.set_time_from_string = function(time_string) {
      var time_arry;
      this.errors = [];
      time_string = time_string.replace(/\s/g, "");
      time_arry = time_string.split(":");
      switch (time_arry.length) {
        case 2:
          this._set_hour(time_arry[0]);
          return this._set_min(time_arry[1]);
        case 1:
          return this._set_hour(time_arry[0]);
        default:
          return this.errors.push("Invalid Format try 07:00");
      }
    };

    Time.prototype._set_hour = function(hour) {
      if (!this.NUMBER_REGEX.test(hour)) {
        this.errors.push("Hour must be number");
      }
      return this.set("hour", hour);
    };

    Time.prototype._set_min = function(min) {
      if (!this.NUMBER_REGEX.test(min)) {
        this.errors.push("Mintue must be number");
      }
      if ((min * 1) > 59) {
        this.errors.push("Mintue over 59");
      }
      return this.set("min", min);
    };

    Time.prototype.is_valid = function() {
      return !this.errors.length;
    };

    return Time;

  })(Backbone.Model);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  App.Models.TimeSheet = (function(superClass) {
    extend(TimeSheet, superClass);

    function TimeSheet() {
      return TimeSheet.__super__.constructor.apply(this, arguments);
    }

    return TimeSheet;

  })(Backbone.Model);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  App.Collections.TimeSheets = (function(superClass) {
    extend(TimeSheets, superClass);

    function TimeSheets() {
      return TimeSheets.__super__.constructor.apply(this, arguments);
    }

    TimeSheets.prototype.model = App.Models.TimeSheet;

    return TimeSheets;

  })(Backbone.Collection);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  App.View = (function(superClass) {
    extend(View, superClass);

    function View(options) {
      if (options == null) {
        options = {};
      }
      this.app = options.app;
      this.parent = options.parent;
      this.$wrapper = options.wrapper;
      this.layout = options.layout;
      if (this.layout && this.render_sections) {
        this._init_layout_sections();
      }
      View.__super__.constructor.apply(this, arguments);
    }

    View.prototype._init_layout_sections = function() {
      App.Views[this.NameSpace].HeaderView;
      if (App.Views[this.NameSpace].HeaderView) {
        this._init_header();
      }
      if (App.Views[this.NameSpace].FooterView) {
        return this._init_footer();
      }
    };

    View.prototype._init_footer = function() {
      return this.footer_view = new App.Views[this.NameSpace].FooterView({
        parent: this,
        app: this.app,
        wrapper: this.layout.$footer_section
      });
    };

    View.prototype._init_header = function() {
      return this.header_view = new App.Views[this.NameSpace].HeaderView({
        parent: this,
        app: this.app,
        wrapper: this.layout.$header_section
      });
    };

    return View;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  App.Views.NewTimeSheetView = (function(superClass) {
    extend(NewTimeSheetView, superClass);

    function NewTimeSheetView() {
      return NewTimeSheetView.__super__.constructor.apply(this, arguments);
    }

    NewTimeSheetView.prototype.dynamic_fields = [
      {
        wrapper_prefix: "email",
        view_name: "EmailFieldView"
      }, {
        wrapper_prefix: "time",
        view_name: "TimeFieldView"
      }, {
        wrapper_prefix: "work-type",
        view_name: "WorkTypeFieldView"
      }
    ];

    NewTimeSheetView.prototype.className = "new-timesheet";

    NewTimeSheetView.prototype.render_sections = true;

    NewTimeSheetView.prototype.NameSpace = "NewTimeSheet";

    NewTimeSheetView.prototype.initialize = function(options) {
      this.model = new App.Models.TimeSheet;
      this.layout = options.layout;
      this._render();
      this._position();
      return this._render_fields();
    };

    NewTimeSheetView.prototype.events = {
      "submit_form": "submit_timesheet",
      "clear_form": "clear_form"
    };

    NewTimeSheetView.prototype.clear_form = function(e, view) {
      this.$form[0].reset();
      this.model.clear();
      return _(this.dynamic_fields).each((function(_this) {
        return function(field) {
          return field.view.reset();
        };
      })(this));
    };

    NewTimeSheetView.prototype.submit_timesheet = function(e, view) {
      var callback, data;
      this.app.show_spinner();
      data = this.$form.serializeObject();
      this.model.set(data);
      callback = (function(_this) {
        return function() {
          _this.app.set_transit_state("timesheet/submitted", {
            model: _this.model
          });
          return _this.app.hide_spinner();
        };
      })(this);
      return setTimeout(callback, 1000);
    };

    NewTimeSheetView.prototype._render = function() {
      this.$el.html(_.template(this.tpl_string));
      return this.$form = this.$("#timesheet-form");
    };

    NewTimeSheetView.prototype._position = function() {
      return this.$wrapper.html(this.el);
    };

    NewTimeSheetView.prototype._render_fields = function() {
      return _(this.dynamic_fields).each((function(_this) {
        return function(field) {
          var view;
          view = new App.Views[field.view_name]({
            app: _this.app,
            parent: _this,
            model: _this.model,
            wrapper: _this.$("#" + field.wrapper_prefix + "-wrapper")
          });
          return field.view = view;
        };
      })(this));
    };

    NewTimeSheetView.prototype.tpl_string = '<form id="timesheet-form"> <div class="row"> <div class="medium-6 columns"> <div id="email-wrapper"></div> </div> <div class="medium-6 columns"> <div id="time-wrapper"></div> </div> </div> <div class="row" > <div class="small-12 columns"> <div class="field-wrapper hidden-focus-label"> <textarea name="message" placeholder="Optional Message" cols="30" rows="10"></textarea> <label for="message">Message</label> </div> </div> </div> <div class="row"> <div class="small 12 columns"> <div id="work-type-wrapper"></div> </div> </div> </form>';

    return NewTimeSheetView;

  })(App.View);

}).call(this);

(function() {


}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  App.Views.SubmittedTimeSheetView = (function(superClass) {
    extend(SubmittedTimeSheetView, superClass);

    function SubmittedTimeSheetView() {
      return SubmittedTimeSheetView.__super__.constructor.apply(this, arguments);
    }

    SubmittedTimeSheetView.prototype.className = "submitted-timesheet";

    SubmittedTimeSheetView.prototype.render_sections = true;

    SubmittedTimeSheetView.prototype.NameSpace = "Submitted";

    SubmittedTimeSheetView.prototype.initialize = function(options) {
      this.model = options.model;
      this._render();
      return this._position();
    };

    SubmittedTimeSheetView.prototype.events = {
      "new_timesheet": "new_timesheet"
    };

    SubmittedTimeSheetView.prototype.new_timesheet = function(e, view) {
      return this.app.navigate("timesheets/new", {
        trigger: true
      });
    };

    SubmittedTimeSheetView.prototype._render = function() {
      var data, tpl;
      data = this.model.toJSON();
      data.hour = this.model.time.get("hour");
      data.min = this.model.time.get("min");
      tpl = _.template($("#submitted-template").html());
      return this.$el.html(tpl(data));
    };

    SubmittedTimeSheetView.prototype._position = function() {
      return this.$wrapper.html(this.el);
    };

    return SubmittedTimeSheetView;

  })(App.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  App.Views.TimeSheetLayout = (function(superClass) {
    extend(TimeSheetLayout, superClass);

    function TimeSheetLayout() {
      return TimeSheetLayout.__super__.constructor.apply(this, arguments);
    }

    TimeSheetLayout.prototype.initialize = function(options) {
      this.$wrapper = options.wrapper;
      this._render();
      return this._position();
    };

    TimeSheetLayout.prototype._render = function() {
      this.$el.html(_.template(this.tpl_string));
      this.$footer_section = this.$("#footer-section");
      this.$header_section = this.$("#header-section");
      return this.$content_area = this.$("#content-area");
    };

    TimeSheetLayout.prototype._position = function() {
      return this.$wrapper.html(this.el);
    };

    TimeSheetLayout.prototype.tpl_string = '<div class="row"> <div class="small-12 columns "id="header-section"> Header Section </div> </div> <div class="header-background"></div> <div class="row"> <div class="small-12 columns" id="content-area"> </div> </div> <div class="row"> <div class="small-12 columns "id="footer-section"> </div> </div>';

    return TimeSheetLayout;

  })(Backbone.View);

}).call(this);

(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  App.Views.FormFieldView = (function(superClass) {
    extend(FormFieldView, superClass);

    function FormFieldView() {
      this.reset = bind(this.reset, this);
      return FormFieldView.__super__.constructor.apply(this, arguments);
    }

    FormFieldView.prototype.has_invalid_class = false;

    FormFieldView.prototype.has_success_class = false;

    FormFieldView.prototype.validation_delay = 600;

    FormFieldView.prototype._render = function() {
      return this.$el.html(_.template(this.tpl_string));
    };

    FormFieldView.prototype._position = function() {
      return this.$wrapper.html(this.el);
    };

    FormFieldView.prototype.mark_as_valid_field = function(options) {
      var $target;
      if (options == null) {
        options = {};
      }
      $target = options.target || this.$el;
      $target.addClass("valid-field");
      $target.removeClass("invalid-field");
      this.has_invalid_class = false;
      this.has_success_class = true;
      return this.validation_delay = 600;
    };

    FormFieldView.prototype.mark_as_invalid_field = function(options) {
      var $target;
      if (options == null) {
        options = {};
      }
      $target = options.target || this.$el;
      if (!this.has_invalid_class) {
        $target.addClass("invalid-field");
      }
      if (this.has_success_class) {
        $target.removeClass;
      }
      this.has_success_class = false;
      return this.validation_delay = 0;
    };

    FormFieldView.prototype.validate_with_delay = function(validator) {
      clearTimeout(this.validation_countdown);
      return this.validation_countdown = setTimeout(validator, this.validation_delay);
    };

    FormFieldView.prototype.reset = function() {
      var has_invalid_class, has_success_class, validation_delay;
      this.$el.removeClass("invalid-field");
      this.$el.removeClass("valid-field");
      has_invalid_class = false;
      has_success_class = false;
      return validation_delay = 600;
    };

    return FormFieldView;

  })(App.View);

}).call(this);

(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  App.Views.EmailFieldView = (function(superClass) {
    extend(EmailFieldView, superClass);

    function EmailFieldView() {
      this._validate_email = bind(this._validate_email, this);
      return EmailFieldView.__super__.constructor.apply(this, arguments);
    }

    EmailFieldView.prototype.EMAIL_REGEX = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    EmailFieldView.prototype.className = "hidden-focus-label field-wrapper";

    EmailFieldView.prototype.initialize = function(options) {
      this._render();
      this._position();
      return this.$email_input = this.$("#email-input");
    };

    EmailFieldView.prototype.events = {
      "keyup": "request_validate_email"
    };

    EmailFieldView.prototype.request_validate_email = function() {
      return this.validate_with_delay(this._validate_email);
    };

    EmailFieldView.prototype._validate_email = function() {
      if (this.EMAIL_REGEX.test(this.$email_input.val())) {
        return this.mark_as_valid_field();
      } else {
        return this.mark_as_invalid_field();
      }
    };

    EmailFieldView.prototype.tpl_string = '<input type="text" name="email" id="email-input"> <label for="email">Email</label> <span class="ion-ios-checkmark-outline valid-icon"></span>';

    return EmailFieldView;

  })(App.Views.FormFieldView);

}).call(this);

(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  App.Views.TimeFieldView = (function(superClass) {
    extend(TimeFieldView, superClass);

    function TimeFieldView() {
      this.reset = bind(this.reset, this);
      this._validate_time = bind(this._validate_time, this);
      return TimeFieldView.__super__.constructor.apply(this, arguments);
    }

    TimeFieldView.prototype.className = "hidden-focus-label field-wrapper";

    TimeFieldView.prototype.initialize = function(options) {
      if (options == null) {
        options = {};
      }
      this._render();
      this._position();
      this.time = new App.Models.Time;
      this.model.time = this.time;
      this.$time_input = this.$("#time-input");
      return this.$error_msg = this.$(".error-msg");
    };

    TimeFieldView.prototype.events = {
      "keyup": "request_validate_time"
    };

    TimeFieldView.prototype.request_validate_time = function() {
      return this.validate_with_delay(this._validate_time);
    };

    TimeFieldView.prototype._validate_time = function() {
      this.time.set_time_from_string(this.$time_input.val());
      if (this.time.is_valid()) {
        this.mark_as_valid_field();
        return this._clear_errors();
      } else {
        this.mark_as_invalid_field();
        return this._render_errors();
      }
    };

    TimeFieldView.prototype._render_errors = function() {
      var error_msg;
      error_msg = this.time.errors.shift();
      return this.$error_msg.html(error_msg);
    };

    TimeFieldView.prototype._clear_errors = function() {
      return this.$error_msg.empty();
    };

    TimeFieldView.prototype.reset = function() {
      TimeFieldView.__super__.reset.apply(this, arguments);
      return this._clear_errors();
    };

    TimeFieldView.prototype.tpl_string = '<input type="text"name="time" id=time-input> <label for="time">Time</label> <span class="ion-ios-checkmark-outline valid-icon"></span> <span class="error-msg">here</span>';

    return TimeFieldView;

  })(App.Views.FormFieldView);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  App.Views.WorkTypeFieldView = (function(superClass) {
    extend(WorkTypeFieldView, superClass);

    function WorkTypeFieldView() {
      return WorkTypeFieldView.__super__.constructor.apply(this, arguments);
    }

    WorkTypeFieldView.prototype.className = "hidden-focus-label field-wrapper work-type-wrapper";

    WorkTypeFieldView.prototype.select_options = [
      {
        key: "Time working on visual effects for a movie",
        value: "Time working on visual effects for a movie"
      }, {
        key: "Time spent reviewing work of junior artist",
        value: "Time spent reviewing work of junior artist"
      }
    ];

    WorkTypeFieldView.prototype.initialize = function(options) {
      this._render();
      this._position();
      return this._render_select_options();
    };

    WorkTypeFieldView.prototype._render = function() {
      this.$el.html(_.template(this.tpl_string));
      return this.$select_box = this.$("#work-type");
    };

    WorkTypeFieldView.prototype._render_select_options = function() {
      return _(this.select_options).each((function(_this) {
        return function(option) {
          return _this.$select_box.append(new Option(option.key, option.value));
        };
      })(this));
    };

    WorkTypeFieldView.prototype.tpl_string = '<select name="work_type" id="work-type"> </select> <label id="work-type-label"> Work Type Select</label>';

    return WorkTypeFieldView;

  })(App.Views.FormFieldView);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  App.Views.NewTimeSheet.HeaderView = (function(superClass) {
    extend(HeaderView, superClass);

    function HeaderView() {
      return HeaderView.__super__.constructor.apply(this, arguments);
    }

    HeaderView.prototype.initialize = function(options) {
      if (options == null) {
        options = {};
      }
      this._render();
      return this._position();
    };

    HeaderView.prototype._render = function() {
      return this.$el.html(_.template(this.tpl_string));
    };

    HeaderView.prototype._position = function() {
      return this.$wrapper.html(this.el);
    };

    HeaderView.prototype.tpl_string = '<div class="row"> <div class="small-12 columns"> <span class="title">Submit TimeSeet</span> </div> </div>';

    return HeaderView;

  })(App.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  App.Views.NewTimeSheet.FooterView = (function(superClass) {
    extend(FooterView, superClass);

    function FooterView() {
      return FooterView.__super__.constructor.apply(this, arguments);
    }

    FooterView.prototype.className = "new-timesheet-footer";

    FooterView.prototype.initialize = function(options) {
      if (options == null) {
        options = {};
      }
      this._render();
      return this._position();
    };

    FooterView.prototype.events = {
      "click #clear": "clear_form",
      "click #next": "submit_form"
    };

    FooterView.prototype.clear_form = function() {
      return this.parent.$el.trigger("clear_form", this);
    };

    FooterView.prototype.submit_form = function() {
      return this.parent.$el.trigger("submit_form", this);
    };

    FooterView.prototype._render = function() {
      return this.$el.html(_.template(this.tpl_string));
    };

    FooterView.prototype._position = function() {
      return this.$wrapper.html(this.el);
    };

    FooterView.prototype.tpl_string = '<div class="row"> <div class="small-6 columns"> <div id="clear"class="action">Clear</div> </div> <div class="small-6 columns"> <div id="next" class="action">Next</div> </div> </div>';

    return FooterView;

  })(App.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  App.Views.Submitted.FooterView = (function(superClass) {
    extend(FooterView, superClass);

    function FooterView() {
      return FooterView.__super__.constructor.apply(this, arguments);
    }

    FooterView.prototype.initialize = function(options) {
      if (options == null) {
        options = {};
      }
      this._render();
      return this._position();
    };

    FooterView.prototype.events = {
      "click #new-timesheet": "new_timesheet"
    };

    FooterView.prototype.new_timesheet = function() {
      return this.parent.$el.trigger("new_timesheet");
    };

    FooterView.prototype._render = function() {
      return this.$el.html(_.template(this.tpl_string));
    };

    FooterView.prototype._position = function() {
      return this.$wrapper.html(this.el);
    };

    FooterView.prototype.tpl_string = '<div class="row"> <div class="small-12 columns"> <div class="action" id="new-timesheet"> Start Again </div> </div> </div>';

    return FooterView;

  })(App.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  App.Views.Submitted.HeaderView = (function(superClass) {
    extend(HeaderView, superClass);

    function HeaderView() {
      return HeaderView.__super__.constructor.apply(this, arguments);
    }

    HeaderView.prototype.initialize = function(options) {
      if (options == null) {
        options = {};
      }
      this._render();
      return this._position();
    };

    HeaderView.prototype.clear_form = function() {
      return console.log("clear form");
    };

    HeaderView.prototype._render = function() {
      return this.$el.html(_.template(this.tpl_string));
    };

    HeaderView.prototype._position = function() {
      return this.$wrapper.html(this.el);
    };

    HeaderView.prototype.tpl_string = '<div class="row"> <div class="small-12 columns"> <span class="title">TimeSheet Submitted</span> </div> </div>';

    return HeaderView;

  })(App.View);

}).call(this);
