var ListsView = Backbone.View.extend({
  el: $("#lists"),

  template: Handlebars.compile($("#lists_template").html()),

  events: {
    "render-board": "render"
  },

  render: function(board_title) {
    this.$el.show();

    Handlebars.registerHelper("showLists", function(board_title, card_list) {
      board_title = board_title.board_title;
      var str = "";
      str += "<h4>" + board_title +"</h4>";
      var lists_on_board = card_list.getLists(board_title);
      // For each list on board...
      lists_on_board.forEach(function(list_id) {
        str += "\n<div class='lists'>";
        str += "\n<h5 class='" + list_id + "'>";
        str += "\n" + list_id + "\n</h5>";

        // Grab each card in board and list
        card_list.filter(function(card) {
          return card.list == list_id && card.board == board_title;
        }).forEach(function(card) {
          str += "\n<div class='card'>";
            str += "\n<p>\ncard.content\n</p>";
          str += "\n</div>";
        });

        str += "\n<a class='add_card' href='#'>\nAdd a card...\n</a>";
        str += "\n</div>";
      });
      return str;
    });

    this.$el.html(this.template({
      board_title: board_title,
      card_list: this.collection
    }));
  }
});
