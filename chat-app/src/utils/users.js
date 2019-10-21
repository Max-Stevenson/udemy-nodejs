const users = [];

const addUser = ({id, username, room}) => {
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    if (!username || !room) {
        return {
            error: 'Username and Room are required!'
        };
    };

    const existingUser = users.find((user) => {
        return user.room === room && user.username === username;
    });

    if (existingUser) {
        return {
            error: 'Username is already in use'
        };
    };

    const user = {id, username, room}
    users.push(user);
    return { user} ;
};

addUser({
    id: 22,
    username: 'aaa',
    room: 'room a'
});

addUser({
    id: 24,
    username: 'aaa',
    room: 'room b'
})

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index != -1) {
        return users.splice(index, 1)[0];
    };
};

const getUser = (id) => {
    return users.find((user) => user.id === id);
};

const getUsersInRoom = (room) => {
    return users.find((user) => user.room === room);
};

foundUsers = getUser(24);
console.log(foundUsers);