const add = (a, b) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(a + b);
        }, 2000);
    });
};

const doWork = async () => {
    const sum = await add(2, 3);
    return sum;
}

doWork().then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});