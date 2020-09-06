document.addEventListener("DOMContentLoaded", () => {
  const userlayout = localStorage.getItem("layout");
  const setLayout = (href = null) => {
    const link = document.createElement("link");
    link.id = "layout";
    link.rel = "stylesheet";
    link.href = `${href}.css`;
    const layout = document.querySelector("#layout");
    if (layout) document.head.removeChild(document.querySelector("#layout"));
    document.head.appendChild(link);
  };
  if (userlayout) {
    setLayout(userlayout);
  }
  let ticTacToes = new Array(9).fill(null);
  const items = document.querySelectorAll(".item");
  const layoutBtn = document.querySelectorAll(".layout-btn");
  const reset = document.querySelector("#reset");
  const userAlert = document.querySelector(".alert");
  const player = {
    cross: "cross",
    circle: "circle",
  };

  /**
   * holds current played user value.
   * @name playerLastRound
   * @type {String}
   */
  let playerLastRound = player.cross;

  let isWinner = false;
  /**
   * draw tic tac toe on the ui.
   * @function drawTicTac
   * @param {Sring<HTML NOode>} item
   * @param {Number} index
   * @returns {void}
   */
  const drawTicTac = (item, index) => {
    item.addEventListener("click", () => {
      if (!isWinner) {
        hide(userAlert);
        if (playerLastRound === player.cross) {
          if (!ticTacToes[index]) {
            playerLastRound = player.circle;
            ticTacToes[index] = player.cross;
            item.innerHTML = "X";
            checkForWinner("Cross");
          } else {
            alertMsg("This is already filled.");
          }
        } else {
          if (!ticTacToes[index]) {
            playerLastRound = player.cross;
            ticTacToes[index] = player.circle;
            item.innerHTML = "O";
            checkForWinner("Circle");
          } else {
            alertMsg("This is already filled.");
          }
        }
      }
    });
  };

  const checkForWinner = (playername) => {
    if (
      ticTacToes[0] &&
      ticTacToes[1] &&
      ticTacToes[0] === ticTacToes[1] &&
      ticTacToes[1] === ticTacToes[2]
    ) {
      winner(playername, 0, 1, 2);
    } else if (
      ticTacToes[3] &&
      ticTacToes[4] &&
      ticTacToes[3] === ticTacToes[4] &&
      ticTacToes[4] === ticTacToes[5]
    ) {
      winner(playername, 3, 4, 5);
    } else if (
      ticTacToes[6] &&
      ticTacToes[7] &&
      ticTacToes[6] === ticTacToes[7] &&
      ticTacToes[7] === ticTacToes[8]
    ) {
      winner(playername, 6, 7, 8);
    } else if (
      ticTacToes[0] &&
      ticTacToes[3] &&
      ticTacToes[0] === ticTacToes[3] &&
      ticTacToes[3] === ticTacToes[6]
    ) {
      winner(playername, 0, 3, 6);
    } else if (
      ticTacToes[1] &&
      ticTacToes[4] &&
      ticTacToes[1] === ticTacToes[4] &&
      ticTacToes[4] === ticTacToes[7]
    ) {
      winner(playername, 1, 4, 7);
    } else if (
      ticTacToes[2] &&
      ticTacToes[5] &&
      ticTacToes[2] === ticTacToes[5] &&
      ticTacToes[5] === ticTacToes[8]
    ) {
      winner(playername, 2, 5, 8);
    } else if (
      ticTacToes[0] &&
      ticTacToes[4] &&
      ticTacToes[0] === ticTacToes[4] &&
      ticTacToes[4] === ticTacToes[8]
    ) {
      winner(playername, 0, 4, 8);
    } else if (
      ticTacToes[2] &&
      ticTacToes[4] &&
      ticTacToes[2] === ticTacToes[4] &&
      ticTacToes[4] === ticTacToes[6]
    ) {
      winner(playername, 2, 4, 6);
    } else {
      let count = 0;
      ticTacToes.forEach((tic) => {
        if (tic !== null) {
          count = count += 1;
        }
      });
      if (count === 9) {
        alertMsg("Match Drew.");
        isWinner = true;
        reset.innerHTML = "Restart";
      }
    }
  };

  ticTacToes.forEach((tictactoe, i) => {
    drawTicTac(items[i], i);
  });

  /**
   *
   * @param {String} palyername
   * @param  {...number} agrs
   */
  const winner = (palyername, ...agrs) => {
    isWinner = true;
    reset.innerHTML = "Restart";
    agrs.forEach((i) => {
      items[i].classList.add("win");
    });
    alertMsg(`${palyername} Wins`);
  };

  /**
   * Alert show passed html node.
   * @function hide
   * @param {HtmlNode} node
   * @returns {void}
   */
  const show = (node) => {
    node.style.opacity = 1;
    node.style.visibility = "visible";
  };

  /**
   * Alert hide passed html node.
   * @function hide
   * @param {HtmlNode} node
   * @returns {void}
   */
  const hide = (node) => {
    node.style.opacity = 0;
    node.style.visibility = "hidden";
  };

  /**
   * Alert message to user.
   * @function alertMsg
   * @param {String} msg
   * @returns {void}
   */
  const alertMsg = (msg) => {
    show(userAlert);
    userAlert.innerHTML = `${msg} <span class="close-alert">x</span>`;
    document
      .querySelector(".close-alert")
      .addEventListener("click", () => hide(userAlert));
  };

  layoutBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      localStorage.setItem("layout", btn.dataset.layout);
      setLayout(btn.dataset.layout);
    });
  });

  reset.addEventListener("click", () => {
    items.forEach((item) => {
      item.innerHTML = "";
      item.classList.remove("win");
    });
    hide(userAlert);
    isWinner = false;
    ticTacToes = new Array(9).fill(null);
    reset.innerHTML = "Reset";
  });
});
