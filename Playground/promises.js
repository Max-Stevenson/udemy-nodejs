const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([1,2,3]);
    }, 2000);
});

doWorkPromise.then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
})