class HanoiView {
  constructor(game, rootEl) {
    this.game = game;
    this.rootEl = rootEl;
    this.setupTowers();
    this.render();
    this.firstClick = undefined;
    this.clicktower();
  }

  setupTowers() {
    for (let h = 0; h < 3; h++) {
      const $ul = $("<ul></ul>");
      $ul.data("tower",h);
      for (let i = 0; i < 3; i++) {
        const $li = $("<li></li>");
        $li.addClass("tower");
        $li.data("pos", `${h},${i}`);
        // console.log($li.data("pos"));
        $ul.append($li);
      }
    this.rootEl.append($ul);
    }
  }

  clicktower() {
    let $ul = $("ul");
    $ul.on("click", event => {
      const tower = event.currentTarget;
      const $tower = $(tower);
      if (this.firstClick === undefined) {
        this.firstClick = $tower.data("tower");
        $tower.addClass("selected");
      } else {
        this.game.move(this.firstClick, $tower.data("tower"));
        this.firstClick = undefined;
        $ul.removeClass();
        this.render();
        if (this.game.isWon()) {
          console.log($(".won"));
          $(".won").attr("style", "display: flex;");
          alert("You win!");
        }
      }
    });
  }

  render() {
    let $li = $("li");
    $li.removeClass();
    $li.each((idx) => {
      const $el = $($li[idx]);
      let pos = $el.data("pos").split(",");
      let x = parseInt(pos[0]);
      let y = parseInt(pos[1]);
      let size = this.game.towers[x][y];
      if (size === 1) {
        $el.addClass("tower small");
      } else if (size === 2) {
        $el.addClass("tower mid");
      } else if (size === 3) {
        $el.addClass("tower large");
      }
    });
  }
}

module.exports = HanoiView;
