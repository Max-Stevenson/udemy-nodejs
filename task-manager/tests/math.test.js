const { calculateTip, add } = require('../src/math');

test('should caculate total with tip', () => {
    const total = calculateTip(10, .3);
    expect(total).toBe(13);
});

test('should calculate total with default tip', () => {
    const total = calculateTip(10);
    expect(total).toBe(11);
});

test('async test demo', (done) => {
    setTimeout(() => {
        expect(1).toBe(1);
        done();
    }, 2000);
});

test('another async test', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5);
    });
    done();
});

test('yet another async example', async() => {
    const sum = await add(2, 3);
    expect(sum).toBe(5);
});