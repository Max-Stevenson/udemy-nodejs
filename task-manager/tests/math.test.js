const { calculateTip } = require('../src/math');

test('should caculate total with tip', () => {
    const total = calculateTip(10, .3);
    expect(total).toBe(13);
});

test('should calculate total with default tip', () => {
    const total = calculateTip(10);
    expect(total).toBe(11);
});