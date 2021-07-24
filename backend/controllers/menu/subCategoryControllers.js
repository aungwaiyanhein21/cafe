const Menu = require('../../models/menu');
const fs = require('fs');

/******* CREATE *******/

const createSubCategory = async (req, res) => {
    const mainCategoryId = req.params.mainCategoryId;
    const categoryId = req.params.categoryId;

   
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

        const newSubCategory = {
            subCategoryName: req.body.subCategoryName,
            products: req.body.products,
        };

        menuData.categories.id(categoryId).subCategories.push(newSubCategory);

        console.log(menuData.categories.id(categoryId));

        const savedData = await menuData.save();
        res.status(201).send(savedData);
    }
    catch (err) {
        return res.status(500).send({
            message: err.message || `Error creating a sub category`
        });
    }

};


/******* Read *******/
// get sub categories within a category which is within a main category
const getSubCategories = async (req, res) => {
    const mainCategoryId = req.params.mainCategoryId;
    const categoryId = req.params.categoryId;


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
        console.log(category);

        const subCategories = category.subCategories;
        res.status(200).send(subCategories);
    }
    catch (err) {
        return res.status(500).send({
            message: err.message || `Error getting sub-categories`
        });
    }
};

const getSubCategory = async (req, res) => {

    const mainCategoryId = req.params.mainCategoryId;
    const categoryId = req.params.categoryId;
    const subCategoryId = req.params.id;


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
                message: `No sub category with id ${subCategoryId} found!`
            });
        }
        res.status(200).send(subCategory);
    }
    catch (err) {
        return res.status(500).send({
            message: err.message || `Error getting a sub-category`
        });
    }

};


/******* Update *******/

const updateSubCategory = async (req, res) => {

    const mainCategoryId = req.params.mainCategoryId;
    const categoryId = req.params.categoryId;
    const subCategoryId = req.params.id;

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

        let indx = undefined;
        for (indx = 0; indx < category.subCategories.length; indx++) {
            subCategoryIdFromArr = category.subCategories[indx]._id.toString();
            if ( subCategoryIdFromArr === subCategoryId) break;
        }

        
        for (let key in updates) {
            category.subCategories[indx][key] = updates[key];
        }
        
        console.log(category.subCategories[indx]);

        const savedData = await menuData.save();
        res.send({
            message: `SubCategory with id ${subCategoryId} under Category with id ${categoryId} under Main Category id ${mainCategoryId} updated`
        });
       
    }
    catch (err) {
        return res.status(500).send({
            message: err.message || `Error updating a sub-category`
        });
    }

};


/******* Delete *******/

const deleteSubCategory = async (req, res) => {
    const mainCategoryId = req.params.mainCategoryId;
    const categoryId = req.params.categoryId;
    const subCategoryId = req.params.id;

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

        console.log(category);
        const subCategory = category.subCategories.id(subCategoryId);
        
        // remove image by image name from imagepath
        let imgLinks = []
        for (let product of subCategory.products) {
            imgLinks.push(product.imagePath);
        }

        console.log(imgLinks);

        for (let imgLink of imgLinks) {
            const path = `./images/${imgLink}`;
            try {
                if (fs.existsSync(path)) {
                    // file exists so delete the file
                    fs.unlinkSync(path);
                }
            } 
            catch(err) {
                console.error(err);
            }
        }


        // remove sub-category
        category.subCategories.id(subCategoryId).remove();
        
        await menuData.save();
        res.send({
            message: `SubCategory with id ${subCategoryId} under Category with id ${categoryId} under Main Category id ${mainCategoryId} deleted`
        });

    }
    catch (err) {
        return res.status(500).send({
            message: err.message || `Error updating a sub-category`
        });
    }

};



module.exports = {
    createSubCategory,
    getSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
};
