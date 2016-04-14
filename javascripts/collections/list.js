var CardList = Backbone.Collection.extend({
  model: Card,

  initialize: function() {
    this.boards = [];
    this.lists = [];
    this.count = 0;

    this.listenTo(this, "add", this.increment);
  },

  increment: function() {
    this.count++;
  },

  getLists: function(board) {
    var lists_on_this_board = [];
    this.forEach(function(card) {
      // Check if card in board
      if ( card.get("board") == board ) {
        // Check if list is already in arr
        if ( lists_on_this_board.indexOf(card.get('list')) === -1 ) {
          lists_on_this_board.push(card.get("list"));
        }
      }
    });

    return lists_on_this_board;
  }
});
