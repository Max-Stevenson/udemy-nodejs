const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            lat: 0,
            long: 0
        }
        callback(data);
    }, 2000);
};

geocode('london', (data) => {
    console.log(data);
});

//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

const add = (x, y, callback) => {
    setTimeout(()=> {
        const sum = x + y;
        callback(sum);
    }, 2000)
};

add(1, 4, (sum) => {
    console.log(sum);
});