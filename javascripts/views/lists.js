var ListsView = Backbone.View.extend({
  el: $("#lists"),

  template: Handlebars.compile($("#lists_template").html()),

  events: {
    "render-board": "render",
    "blur #create_list": "resetInput",
    "keypress #create_list": "checkInput",
    "dblclick .list h5": "editList",
    "click div.remove": "removeList",
    "keypress #edit_list": "submitEdit",
    "blur #edit_list": "render",
    "click .add_card": "addCard",
    "keypress .add_card_input": "submitCard"
  },

  render: function(board_title_obj) {
    // make sure board_title_obj is not an event
    // and assing board_title if new or current
    if ( board_title_obj && board_title_obj.hasOwnProperty('board_title') ) {
      board_title = board_title_obj.board_title;
      this.current_board = board_title;
    } else {
      board_title = this.current_board;
    }

    this.$el.show();

    Handlebars.registerHelper("showLists", function(board_title, card_list) {
      var str = "";
      str += "<h4>" + board_title +"</h4>";
      var lists_on_board = card_list.getLists(board_title);
      // For each list on board...
      lists_on_board.forEach(function(list_title) {
        str += "\n<div class='list'>";
        str += "\n<h5 class='" + list_title + "'>";
        str += "\n" + list_title + "\n</h5>";

        // Grab each card in board and list
        card_list.filter(function(card) {
          return card.get("list") == list_title && card.get("board") == board_title;
        }).forEach(function(card) {
          str += "\n<div class='card'>";
            str += "\n<p>"+"\n" + card.get("id") + "\n</p>";
          str += "\n</div>";
        });

        str += "\n<a class='add_card' href='#'>\nAdd a card...\n</a>";

        str += "\n<div class='remove'>\n</div>";
        str += "\n</div>";
      });

      return str;
    });

    this.$el.html(this.template({
      board_title: board_title,
      card_list: this.collection
    }));
  },

  resetInput: function(e) {
    $(e.target).val('');
  },

  checkInput: function(e) {
    if ( e.which == 13 ) {
      var list_name = $(e.target).val();
      if ( list_name === "" ) {
        $(e.target).attr("placeholder", "This needs a name");
        return;
      }
      this.collection.lists.push(list_name);
      this.collection.add(new Card({
        list: list_name,
        board: this.current_board,
        id: "First Card"
      }));
      $(e.target).val('');
      this.render();
    }
  },

  removeList: function(e) {
    var list = $(e.target).siblings("h5").attr("class");

    // remove list
    var idx = this.collection.lists.indexOf(list);
    this.collection.boards.splice(idx, 1);

    // remove cards in list
    var cards_in_list = this.collection.where({ list: list });
    this.collection.remove(cards_in_list);

    this.render();
  },

  editList: function(e) {
    $(e.target).hide();
    $(e.target).closest(".list").prepend("<input type='text' id='edit_list'>");
    $("#edit_list").focus();
  },

  submitEdit: function(e) {
    if ( e.which === 13 ) {
      var list_name = $(e.target).val();
      if ( list_name === "" ) {
        $(e.target).attr("placeholder", "Cannot be empty");
        return;
      }

      // find cards and replace their list name with current one
      var current_list = $(e.target).siblings("h5").text().trim();
      var cards_in_list = this.collection.where({ list: current_list });
      cards_in_list.forEach(function(card) {
        card.set("list", list_name);
      });

      // replace current list name in collection with new list name
      var idx = this.collection.lists.indexOf(list_name);
      this.collection.lists.splice(idx, 1, list_name);

      $(e.target).val('');
      this.render();
    }
  },

  addCard: function(e) {
    $(e.target).replaceWith("<input type='text' class='add_card_input'>");
    $("input.add_card_input").focus();
  },

  submitCard: function(e) {
    if ( e.which == 13 ) {
      var card_name = $(e.target).val();
      if ( card_name === "" ) {
        $(e.target).attr("placeholder", "Cannot be empty");
        return;
      }
      this.collection.add({
        id: card_name,
        list: $(e.target).siblings("h5").attr("class"),
        board: $(e.target).parent().siblings("h4").text().trim()
      });

      $(e.target).val('');
      this.render();
    }
  },

  removeCard: function(e) {

  }
});
