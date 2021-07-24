
const Cart = require('../models/cart');
const Menu = require('../models/menu');


/******* helper functions *******/
async function calculateSubTotal (products) {
    let subTotal = 0;
    for (let product of products) {
        const productData = await getProductData(product);
        
        subTotal += productData.price[product.choice] * (product.quantity);
    }
    
    return subTotal;
}

function getIndexFromProducts(previousProducts, currProduct) {

    return previousProducts.findIndex((prevProd) => {
        
        hasSameProductId = (prevProd.productId.toString() === currProduct.productId.toString());
        hasSameChoice = (prevProd.choice === currProduct.choice);
        
        return (hasSameProductId && hasSameChoice);
    })
}

async function getProductData ({mainCategoryId, categoryId, subCategoryId, productId}) {
    try {
        const mainCategoryData = await Menu.findById(mainCategoryId);
        const categoryData = mainCategoryData.categories.id(categoryId);
        const subCategoryData = categoryData.subCategories.id(subCategoryId);
        const productData = subCategoryData.products.id(productId);
        
        return productData;
    }
    catch (err) {
        console.log(err);
    }
}

async function calculateTotalProductsNum (products) {
    let totalNum = 0;
    for (let product of products) {
        totalNum += product.quantity;
    }
    
    return totalNum;
}



/******* CREATE *******/
const addCartProducts = async (req, res) => {
    
    const userId = req.userDecodedJWT.id;
    const menuIds = req.body.menuIds;
    const choice = req.body.choice;
    const quantity = parseInt(req.body.quantity);

    if (quantity === 0) {
        return res.json({error: 'Quantity must be greater than 1'});
    }

    let newProductInfo = {
        mainCategoryId: menuIds.mainCategoryId,
        categoryId: menuIds.categoryId,
        subCategoryId: menuIds.subCategoryId,
        productId: menuIds.productId,
        choice: choice,
    }

    const userData = await Cart.findOne({userId});
    if (!userData) {
        // we do not have cart for a particular user
        // so create a new cart with a product

        console.log('creating a cart');

        newProductInfo['quantity'] = quantity;

        const newCart = new Cart({
            userId: userId,
            products: [newProductInfo]
        })

        try {
            const data = await newCart.save();
            res.status(201).json({
                data: data,
                message: "Added to Cart Successfully"
            });
        }
        catch (err) {
            res.status(500).json({
                error: err.message || 'Some error occurred while creating a cart'
            });
        }
    }
    else {
        // we have an existing cart for a particular user

        // check if the curr one is same as added ones
        const indx = getIndexFromProducts(userData.products, newProductInfo);
        if (indx === -1) {
            // no same products with same choices found
            newProductInfo['quantity'] = quantity;
            userData.products.push(newProductInfo);
        }
        else {
            userData.products[indx].quantity += quantity;
        }

        try {
            const data = await userData.save();
            res.json({
                data: data,
                message: "Added to Cart Successfully"
            });
        }
        catch (err) {
            res.status(500).json({
                error: err.message || 'Some error occurred while adding new products to cart'
            });
        }
    }   

};


/******* GET THE PRODUCTS IN THE CART *******/
const getCartProducts = async (req, res) => {
    const userId = req.userDecodedJWT.id;

    const userCartData = await Cart.findOne({userId});
    
    if ('search' in req.query) {

        if (req.query.search === 'quantity') {
            // we are trying to get the total quantity in the cart
            if (!userCartData) {
                return res.json({
                    totalNum: 0
                });
            }
            else {
                const totalNum = await calculateTotalProductsNum(userCartData.products);
                return res.json({
                    totalNum: totalNum
                });
            }
            
        }
        
    }
    
    if (!userCartData) {
        return res.json({
            'products': [],
            'subTotal': 0,
            'totalNum': 0,
            'message': 'No Products in the Cart yet!'
        });
    }

    if ('search' in req.query) {
        if (req.query.search === 'quantity') {
            const totalNum = await calculateTotalProductsNum(userCartData.products);
            res.json({
                totalNum: totalNum
            });
        }
        
    }

    let cartObj = {};

    let cartProducts = [];

    for (let product of userCartData.products) {
        const {mainCategoryId, categoryId, subCategoryId, productId, choice, quantity} = product;
        const productData = await getProductData({mainCategoryId, categoryId, subCategoryId, productId});

        let productObj = {
            mainCategoryId,
            categoryId,
            subCategoryId,
            productId,
            quantity
        }

        // id to uniquely identify the product when product Id can be the same 
        productObj['_id'] = product._id;

        let size = '';
        if (choice === 'largeCupPrice') {
            size = 'Large';
        }
        else if (choice === 'mediumCupPrice') {
            size = 'Medium';
        }
        else if (choice === 'smallCupPrice') {
            size = 'Small';
        }
        else {
            size = null;
        }

        productObj['size'] = size;

        productObj['productDetails'] = {
            productName: productData.productName,
            status: productData.status,
            price: productData.price[choice],
            imagePath: productData.imagePath
        }

        cartProducts.push(productObj);
        
    }

    const subTotal = await calculateSubTotal(userCartData.products);
    const totalNum = await calculateTotalProductsNum(userCartData.products);

    cartObj['products'] = cartProducts;
    cartObj['subTotal'] = subTotal;
    cartObj['totalNum'] = totalNum;

    let message = "";
    if (cartObj['products'].length === 0) {
        message = "Your Cart is empty";
    }
    else {
        message = null;
    }
    cartObj['message'] = message;
   
    res.json(cartObj);

}

/******* UPDATE THE QUANTITY OF THE PRODUCT IN THE CART *******/
const updateCartProduct = async (req, res) => {
    const userId = req.userDecodedJWT.id;
    const id = req.params.id;
    const quantity = req.body.quantity;

    const userCartData = await Cart.findOne({userId});
    let productData = userCartData.products.id(id);
  
    productData.quantity = quantity;

    await userCartData.save();
    res.json({
        message: `Updated the quantity of the product`
    });
}

/******* DELETE A PRODUCT IN THE CART *******/
const removeCartProduct = async (req, res) => {
    const userId = req.userDecodedJWT.id;
    const id = req.params.id;

    const userCartData = await Cart.findOne({userId});
   
    // get back the products that do not match with the given id param
    // in other words, remove the product from the cart
    userCartData.products = userCartData.products.filter(product => (
        product._id.toString() !== id
    ));
   
    await userCartData.save();
    res.json({
        message: `Removed from the cart`
    });

}


module.exports = {
    addCartProducts,
    getCartProducts,
    updateCartProduct,
    removeCartProduct
};
