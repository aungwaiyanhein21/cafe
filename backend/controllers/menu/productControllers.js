const Menu = require('../../models/menu');
const fs = require('fs');

/******* CREATE *******/

const createProduct = async (req, res) => {
    console.log('in creating product function')
    console.log(req.body);
    console.log(req.file);

    const mainCategoryId = req.params.mainCategoryId;
    const categoryId = req.params.categoryId;
    const subCategoryId = req.params.subCategoryId;

    try {
        const menuData = await Menu.findById(mainCategoryId);
        if (!menuData) {
            return res.status(404).send({
                message: `No main category with id ${mainCategoryId} found!`
            });
        }

        const category = menuData.categories.id(categoryId);
        if (!category) {
            return res.status(404).send({
                message: `No category with id ${categoryId} found!`
            });
        }

        const subCategory = category.subCategories.id(subCategoryId);
        if (!subCategory) {
            return res.status(404).send({
                message: `No sub-category with id ${subCategoryId} found!`
            });
        }

        let newProduct = {
            productName: req.body.productName,
            description: req.body.description,
            status: req.body.status,
            priceOption: req.body.priceOption,
            price: {
                smallCupPrice: parseFloat(req.body.smallCupPrice),
                mediumCupPrice: parseFloat(req.body.mediumCupPrice),
                largeCupPrice: parseFloat(req.body.largeCupPrice),
                otherPrice: parseFloat(req.body.otherPrice)
            },
            imagePath: req.file.filename
        };

        subCategory.products.push(newProduct);

        console.log(subCategory.products);

        const savedData = await menuData.save();
        res.status(201).send(savedData);
    }
    catch (err) {
        return res.status(500).send({
            message: err.message || `Error creating a product`
        });
    }

};


/******* Read *******/
// get products within a sub category that is within a category which is under a main category
const getProducts = async (req, res) => {
    const mainCategoryId = req.params.mainCategoryId;
    const categoryId = req.params.categoryId;
    const subCategoryId = req.params.subCategoryId;

    try {
        const menuData = await Menu.findById(mainCategoryId);
        if (!menuData) {
            return res.status(404).send({
                message: `No main category with id ${mainCategoryId} found!`
            });
        }

        const category = menuData.categories.id(categoryId);
        if (!category) {
            return res.status(404).send({
                message: `No category with id ${categoryId} found!`
            });
        }

        const subCategory = category.subCategories.id(subCategoryId);
        if (!subCategory) {
            return res.status(404).send({
                message: `No sub-category with id ${subCategoryId} found!`
            });
        }

        const products = subCategory.products;
        res.status(200).send(products);
    }
    catch (err) {
        return res.status(500).send({
            message: err.message || `Error creating a product`
        });
    }

};

const getProduct = async (req, res) => {
    const mainCategoryId = req.params.mainCategoryId;
    const categoryId = req.params.categoryId;
    const subCategoryId = req.params.subCategoryId;
    const productId = req.params.id;

    try {
        const menuData = await Menu.findById(mainCategoryId);
        if (!menuData) {
            return res.status(404).send({
                message: `No main category with id ${mainCategoryId} found!`
            });
        }

        const category = menuData.categories.id(categoryId);
        if (!category) {
            return res.status(404).send({
                message: `No category with id ${categoryId} found!`
            });
        }

        const subCategory = category.subCategories.id(subCategoryId);
        if (!subCategory) {
            return res.status(404).send({
                message: `No sub-category with id ${subCategoryId} found!`
            });
        }
      
        const product = subCategory.products.id(productId);
        if (!product) {
            return res.status(404).send({
                message: `No product with id ${productId} found!`
            });
        }

        res.status(200).send(product);
    }
    catch (err) {
        return res.status(500).send({
            message: err.message || `Error getting a sub-category`
        });
    }

};


/******* Update *******/

const updateProduct = async (req, res) => {
    const mainCategoryId = req.params.mainCategoryId;
    const categoryId = req.params.categoryId;
    const subCategoryId = req.params.subCategoryId;
    const productId = req.params.id;

    const updates = req.body;

    try {
        const menuData = await Menu.findById(mainCategoryId);
        if (!menuData) {
            return res.status(404).send({
                message: `No main category with id ${mainCategoryId} found!`
            });
        }

        const category = menuData.categories.id(categoryId);
        if (!category) {
            return res.status(404).send({
                message: `No category with id ${categoryId} found!`
            });
        }

        const subCategory = category.subCategories.id(subCategoryId);
        if (!subCategory) {
            return res.status(404).send({
                message: `No sub-category with id ${subCategoryId} found!`
            });
        }


        let indx = undefined;
        for (indx = 0; indx < subCategory.products.length; indx++) {
            productIdFromArr = subCategory.products[indx]._id.toString();
            if ( productIdFromArr === productId) break;
        }

        // first remove the img pointed by image path in category
        const path = `./images/${subCategory.products[indx].imagePath}`;
        try {
            if (fs.existsSync(path)) {
                // file exists so delete the file
                fs.unlinkSync(path);
            }
        } 
        catch(err) {
            console.error(err);
        }

        console.log('product controller');
        console.log(subCategory.products[indx]);

        let price = subCategory.products[indx]['price'];

        // update the fields in category
        for (let key in updates) {
            if (!(key in price)) {
                subCategory.products[indx][key] = updates[key];
            }
            else {
                subCategory.products[indx]['price'][key] = updates[key];
            }
        }

        // update the imagePath
        subCategory.products[indx]['imagePath'] = req.file.filename;

        
        console.log(subCategory.products[indx]);

        const savedData = await menuData.save();
        res.send({
            message: `Product with id ${productId} under SubCategory with id ${subCategoryId} under Category with id ${categoryId} under Main Category id ${mainCategoryId} updated`
        });
       
    }
    catch (err) {
        return res.status(500).send({
            message: err.message || `Error updating a product`
        });
    }

};


/******* Delete *******/

const deleteProduct = async (req, res) => {
    const mainCategoryId = req.params.mainCategoryId;
    const categoryId = req.params.categoryId;
    const subCategoryId = req.params.subCategoryId;
    const productId = req.params.id;

    try {
        const menuData = await Menu.findById(mainCategoryId);
        if (!menuData) {
            return res.status(404).send({
                message: `No main category with id ${mainCategoryId} found!`
            });
        }

        const category = menuData.categories.id(categoryId);
        if (!category) {
            return res.status(404).send({
                message: `No category with id ${categoryId} found!`
            });
        }

        const subCategory = category.subCategories.id(subCategoryId);
        if (!subCategory) {
            return res.status(404).send({
                message: `No sub-category with id ${subCategoryId} found!`
            });
        }


        // remove image by image name from imagepath
        const path = `./images/${subCategory.products.id(productId).imagePath}`;
        try {
            if (fs.existsSync(path)) {
                // file exists so delete the file
                fs.unlinkSync(path);
            }
        } 
        catch(err) {
            console.error(err);
        }


       // remove product
       subCategory.products.id(productId).remove();
        
       await menuData.save();
       res.send({
           message: `product with id ${productId} under SubCategory with id ${subCategoryId} under Category with id ${categoryId} under Main Category id ${mainCategoryId} deleted`
       });
       
    }
    catch (err) {
        return res.status(500).send({
            message: err.message || `Error deleting a product`
        });
    }

};



module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
};
