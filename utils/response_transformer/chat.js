module.exports = {
    chatList: (chats) => {
        if (chats.length == 0 || !chats) return [];
        return chats.map((chat) => {
            let newchat = {
                id: chat.id,
                name: chat.name,
                type: chat.type,
                partner: chat.receivers.map(receiver => {
                    return {
                        id: receiver.user.id,
                        name: receiver.user.name,
                        joined_at: receiver.joined_at,
                        role: receiver.role
                    }
                }),
                created_at: chat.created_at,
                updated_at: chat.updated_at
            }

            return newchat;
        });
    }
}