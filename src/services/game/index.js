class GameService {
  async joinGameRoom(socket, roomId) {
    return new Promise((response, reject) => {
      socket.emit("join_game", { roomId });
      socket.on("room_joined", () => response(true));
      socket.on("room_join_error", ({ error }) => reject(error));
    });
  }

  async leaveGameRoom(socket, roomId) {
    socket.emit("leave_game", { roomId });
    socket.on("room_left", () => console.log("you left room"));
  }

  async onLeaveGameRoom(socket, listner) {
    socket.on("left_game", (msg) => listner(msg));
  }

  async updateGame(socket, matrix) {
    socket.emit("update_game", { matrix });
  }

  async onGameUpdate(socket, listner) {
    socket.on("on_game_update", ({ matrix }) => listner(matrix));
  }

  async onStartGame(socket, listner) {
    socket.on("start_game", listner);
  }

  async gameWin(socket, message) {
    socket.emit("game_win", { message });
  }

  async onGameWin(socket, listner) {
    socket.on("on_game_win", ({ message }) => listner(message));
  }

  async restartGame(socket, matrix) {
    socket.emit("restart_game", { matrix });
  }

  async onRestartGame(socket, listner) {
    socket.on("on_restart_game", ({ message }) => listner(message));
  }
}

export default new GameService();
