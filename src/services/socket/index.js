import { io } from "socket.io-client";

class SocketService {
  socket = null;
  connect(url) {
    return new Promise((response, reject) => {
      this.socket = io(url);

      if (!this.socket) return reject();

      this.socket.on("connect", () => {
        response(this.socket);
      });

      this.socket.on("connect_error", (err) => {
        console.log("Connection error: ", err);
        reject(err);
      });
    });
  }
}

export default new SocketService();
