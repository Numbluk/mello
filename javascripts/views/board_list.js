var BoardListView = Backbone.View.extend({

  el: $("#boards"),

  template: Handlebars.compile($("#boards_template").html()),

  events: {
    "click #create_board #create_board_title": "addInput",
    "keypress #create_board input": "submitInput"
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template({ boards: this.model.get("board_list") }));
  },

  addInput: function(e) {
    this.$el.find("#create_board").html("<input type='text'>");
    var $input = $(e.delegateTarget).find("input");
    window.setTimeout(function() {
      $input.focus();
    }, 0);
  },

  submitInput: function(e) {
    var input = e.target;
    if ( e.which == 13 ) {
      if ( $(input).val() === "" ) {
        $(input).attr("placeholder", "Cannot be empty");
        return;
      }

      this.model.get("board_list").unshift( $(input).val() );
      this.render();
    }
  }
});
