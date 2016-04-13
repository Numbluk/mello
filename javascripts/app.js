var app = {
  init: function() {
    this.bind();

    this.card_list = new CardList();
    this.board_view = new BoardListView({ collection: this.card_list });
    this.lists_view = new ListsView({ collection: this.card_list });

    this.dispatcher = _.extend({}, Backbone.Events);

    this.dispatcher.listenTo(this.board_view, "render-board", this.lists_view.render.bind(this.lists_view));
  },

  bind: function() {
    var app = this;
    $("#show_boards, #title").on("click", function(e) {
      e.preventDefault();
      $("#lists").hide();
      app.board_view.render();
    });
  }
};

app.init();
