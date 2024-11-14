import { Server } from "socket.io";

const messages = [];

// Configura el servidor Socket.IO
export const config = (httpServer) => {
    // Crea una nueva instancia del servidor Socket.IO
    const socketServer = new Server(httpServer);

    // Escucha el evento de conexión de un nuevo cliente
    socketServer.on("connection", (socket) => {
        socket.on("message", (data)=>{
            const { user, message }= data;
            messages.push({ user, message });

            socketServer.emit("message-log", { messages });
        });
        // Escucha el evento de desconexión del cliente
        socket.on("authenticated", (data) => {
            socket.broadcast.emit("new-user-connect", data);
        });
    });
};