module.exports = {
    chatList: (chats) => {
        if (chats.length == 0 || !chats) return [];
        return chats.map((chat) => {
            let newchat = {
                id: chat.id,
                name: chat.name,
                type: chat.type,
                me: {
                    id: chat.participants[0].user.id,
                    name: chat.participants[0].user.name,
                },
                partner: chat.receivers.map(receiver => {
                    return {
                        id: receiver.user.id,
                        name: receiver.user.name,
                        joined_at: receiver.joined_at,
                        role: receiver.role
                    }
                }),
                latestMessage: {
                    id: chat.latestMessage.id,
                    content: chat.latestMessage.content,
                    sender: {
                        id: chat.latestMessage.sender.id,
                        name: chat.latestMessage.sender.name
                    },
                    created_at: chat.latestMessage.createdAt
                },
                created_at: chat.createdAt,
            }

            return newchat;
        });
    },

    chatDetail: (chat) => {
        let newchat = {
            id: chat.id,
            name: chat.name,
            type: chat.type,
            me: {
                id: chat.participants[0].user.id,
                name: chat.participants[0].user.name,
            },
            partner: chat.receivers.map(receiver => {
                return {
                    id: receiver.user.id,
                    name: receiver.user.name,
                    joined_at: receiver.joined_at,
                    role: receiver.role
                }
            }),
            messages: chat.messages.map(message => {
                return {
                    id: message.id,
                    content: message.content,
                    sender: {
                        id: message.sender.id,
                        name: message.sender.name
                    },
                    created_at: message.createdAt
                }
            }),
            created_at: chat.createdAt,
        }

        return newchat;
    }
}