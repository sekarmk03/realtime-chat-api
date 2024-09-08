module.exports = {
    messageList: (messages) => {
        if (messages.length == 0 || !messages) return [];
        return messages.map((message) => {
            let newMessage = {
                id: message.id,
                content: message.content,
                sender: {
                    id: message.sender.id,
                    name: message.sender.name
                },
                created_at: message.createdAt
            }

            return newMessage;
        });
    },

    messageDetail: (message) => {
        let newMessage = {
            id: message.id,
            content: message.content,
            sender: {
                id: message.sender.id,
                name: message.sender.name
            },
            created_at: message.createdAt
        }

        return newMessage;
    }
}