const name = 'Max';
const userAge = 28;

const user = {
    name,
    userAge,
    location: 'Windsor, UK'
};

console.log(user);

const product = {
    lable: 'Red notebook',
    price: 3.00,
    stock: 201,
    salePrice: undefined
};

const {lable, stock} = product;

console.log(lable);

const transaction = (type, {lable, stock}) => {
    console.log(type, lable, stock);
}

transaction ('order', product);