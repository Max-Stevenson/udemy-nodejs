const add = (a, b) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return rej('numbers must be positive');
            }
            res(a + b);
        }, 2000);
    });
};

const doWork = async () => {
    const sum = await add(2, 3);
    const sum2 = await add(sum, -5);
    return sum2;
}

doWork().then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});