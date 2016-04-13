var CardList = Backbone.Collection.extend({
  model: Card,

  initialize: function() {
    this.boards = [];
    this.lists = [];
  },

  getLists: function(board) {
    var lists_on_this_board = [];
    this.forEach(function(card) {
      // Check if card in board
      if ( card.board == board ) {
        // Check if list is already in arr
        if ( !_contains(lists_on_this_board, card.list) ) {
          lists_on_this_board.push(card.list);
        }
      }
    });

    return lists_on_this_board;
  }
});
