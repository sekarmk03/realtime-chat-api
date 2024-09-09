let onlineUsers = []; // To keep track of online users

module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('addNewUser', (userId) => {
            !onlineUsers.some((user) => user.user_id == userId) &&
            onlineUsers.push({
                user_id: userId,
                socket_id: socket.id,
            });

            io.emit('onlineUsers', onlineUsers);
        });
        
        // listen for new chat creation
        socket.on('createChat', (chat, recipientId) => {
            let user = onlineUsers.find((user) => user.user_id == recipientId);

            if (user) {
                io.to(user.socket_id).emit('getChat', chat);
            }
        });

        socket.on('sendMessage', (message, recipientId) => {
            let user = onlineUsers.find((user) => user.user_id == recipientId);

            if (user) {
                io.to(user.socket_id).emit('getMessage', message);
            }
        });

        socket.on('activity', (activity, userId, recipientId) => {
            let recipient = onlineUsers.find((user) => user.user_id == recipientId);
            let sender = onlineUsers.find((user) => user.user_id == userId);

            if (sender) {
                io.to(user.socket_id)
            }
        });

        socket.on("disconnect", () => {
            onlineUsers = onlineUsers.filter(
                (user) => user.socket_id != socket.id
            );

            io.emit("onlineUsers", onlineUsers);
        });

        // // Listen for user typing activity
        // socket.on('typing', (typingData) => {
        //     console.log(`${typingData.user} is typing...`);
        //     // Notify other users in the chat
        //     socket.broadcast.emit('userTyping', typingData);
        // });
    });
}