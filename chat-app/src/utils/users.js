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

const res = addUser({
    id: 24,
    username: 'aaa',
    room: 'room b'
})

console.log(users);

console.log(res);



const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index != -1) {
        return users.splice(index, 1)[0];
    };
};

const removedUser = removeUser(24);

console.log(removedUser);


const getUser = () => {

};

const getUsersInRoom = () => {

};