var BoardListView = Backbone.View.extend({

  el: $("#boards"),

  template: Handlebars.compile($("#boards_template").html()),

  events: {
    "click #create_board #create_board_title": "addInput",
    "keypress #create_board input": "submitInput",
    "blur #create_board input": "render",
    "click a.board": "renderBoard",
    "click div.remove": "removeBoard"
  },

  initialize: function(options) {
    this.render();
  },

  render: function() {
    this.$el.html(this.template({ boards: this.collection.boards }));
    this.$el.show();
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

      this.collection.boards.unshift( $(input).val() );
      this.render();
    }
  },

  renderBoard: function(e) {
    this.trigger("render-board", {
      board_title: $(e.target).text().trim()
    });
    this.$el.hide();
  },

  removeBoard: function(e) {
    e.stopPropagation();
    var board_title = $(e.target).closest("a").text().trim();

    // remove board
    var idx = this.collection.boards.indexOf(board_title);
    this.collection.boards.splice(idx, 1);

    var cards_in_board = this.collection.where({ board: board_title });

    // remove lists related to cards being removed
    cards_in_board.forEach(function(card) {
      var lists = this.collection.lists;
      var lists_to_keep = [];
      for ( var i = 0; i < lists.length; i++ ) {
        if ( lists[i] != card.list ) {
          lists_to_keep.push(lists[i]);
        }
      }
    });

    // remove cards
    this.collection.remove(cards_in_board);

    this.render();
  }
});
