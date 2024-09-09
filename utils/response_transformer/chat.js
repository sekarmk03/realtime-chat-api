const messageTransform = require('./message');

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
                        id: receiver.user?.id ?? null,
                        name: receiver.user?.name ?? "",
                        joined_at: receiver?.joined_at ?? "",
                        role: receiver?.role ?? ""
                    }
                }),
                latestMessage: (chat.latestMessage.length > 0) ? messageTransform.messageDetail(chat.latestMessage) : [],
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
            messages: messageTransform.messageList(chat.messages),
            created_at: chat.createdAt,
        }

        return newchat;
    },

    chatListDetail: (chat) => {
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
            latestMessage: chat.latestMessage.length > 0 ? messageTransform.messageDetail(chat.latestMessage) : [],
            created_at: chat.createdAt,
        }

        return newchat;
    }
}