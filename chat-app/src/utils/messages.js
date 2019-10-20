const generateMessage = (messageText) => {
    return {
        messageText,
        createdAt: new Date().getTime()
    }
};

const generateLocationMessage = (url) => {
    return {
        url,
        createdAt: new Date().getTime()
    }
};

module.exports = {
    generateMessage,
    generateLocationMessage
};