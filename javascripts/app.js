var app = {
  init: function() {
    this.board_list = new BoardList();
    this.board_view = new BoardListView({ model: this.board_list });
  }
};

app.init();
