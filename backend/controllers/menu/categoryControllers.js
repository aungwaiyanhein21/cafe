const Menu = require('../../models/menu');
const fs = require('fs');

/******* CREATE *******/

const createCategory = async (req, res) => {

    console.log(req.file);
    
    
    const mainCategoryId = req.params.mainCategoryId;

    // res.status(201).send('uploaded image and put into database');

    try {
        const menuData = await Menu.findById(mainCategoryId);
        if (!menuData) {
            return res.status(404).send({
                message: `No main category with id ${mainCategoryId} found!`
            });
        }

        const newCategory = {
            categoryName: req.body.categoryName,
            subCategories: [],
            imagePath: req.file.filename
        };

        menuData.categories.push(newCategory);

        const savedData = await menuData.save();
        res.status(201).send(savedData);
    }
    catch (err) {
        return res.status(500).send({
            message: err.message || `Error creating a category`
        });
    }
    
};


/******* Read *******/
// get categories within a main category
const getCategories = async (req, res) => {
    const mainCategoryId = req.params.mainCategoryId;
    
    try {
        const mainCategory = await Menu.findById(mainCategoryId);
        if (!mainCategory) {
            return res.status(404).send({
                message: `No Main Category with id ${id} found!`
            });
        }

        const categories = mainCategory.categories;
        res.status(200).send(categories);
    }
    catch (err) {
        res.status(500).send({
            message: err.message || `Cannot get categories under main category with id ${mainCategoryId}`
        });
    }
};

const getCategory = async (req, res) => {
    const mainCategoryId = req.params.mainCategoryId;
    const categoryId = req.params.id;

    try {
        const mainCategory = await Menu.findById(mainCategoryId);
        if (!mainCategory) {
            return res.status(404).send({
                message: `No Main Category with id ${id} found!`
            });
        }

        const category = mainCategory.categories.id(categoryId);
        res.status(200).send(category);
    }
    catch (err) {
        res.status(500).send({
            message: err.message || `Cannot get a category with id ${categoryId} under main category with id ${mainCategoryId}`
        });
    }

};


/******* Update *******/

const updateCategory = async (req, res) => {
    const mainCategoryId = req.params.mainCategoryId;
    const categoryId = req.params.id;
    const updates = req.body;

    try {
        const mainCategory = await Menu.findById(mainCategoryId);
        if (!mainCategory) {
            return res.status(404).send({
                message: `No Main Category with id ${id} found!`
            });
        }

        let indx = undefined;
        for (indx = 0; indx < mainCategory.categories.length; indx++) {
            categoryIdFromArr = mainCategory.categories[indx]._id.toString();
            if ( categoryIdFromArr === categoryId) break;
        }

        console.log(mainCategory.categories[indx].imagePath);


        // first remove the img pointed by image path in category
        const path = `./images/${mainCategory.categories[indx].imagePath}`;
        try {
            if (fs.existsSync(path)) {
                // file exists so delete the file
                fs.unlinkSync(path);
            }
        } 
        catch(err) {
            console.error(err);
        }

        // update the fields in category
        for (let key in updates) {
            mainCategory.categories[indx][key] = updates[key];
        }
        // update the imagePath
        mainCategory.categories[indx]['imagePath'] = req.file.filename;
        
        console.log(mainCategory.categories[indx]);

        
        const savedData = await mainCategory.save();
        res.send({
            message: `Category with id ${categoryId} under main Category id ${mainCategoryId} updated`
        });
       
    }
    catch (err) {
        return res.status(500).send({
            message: err.message || `Error updating a category`
        });
    }

};


/******* Delete *******/

const deleteCategory = async (req, res) => {
    const mainCategoryId = req.params.mainCategoryId;
    const categoryId = req.params.id;

    try {
        const mainCategory = await Menu.findById(mainCategoryId);
        if (!mainCategory) {
            return res.status(404).send({
                message: `No Main Category with id ${id} found!`
            });
        }


        // remove image by image name from imagepath
        let imgLinks = []
        const category = mainCategory.categories.id(categoryId);
        imgLinks.push(category.imagePath);
        for (let subCategory of category.subCategories) {
            for (let product of subCategory.products) {
                imgLinks.push(product.imagePath);
            }
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

        // remove sub document
        mainCategory.categories.id(categoryId).remove();
        
        await mainCategory.save();
        res.send({
            message: `Category with id ${categoryId} under main Category id ${mainCategoryId} deleted`
        });

    }
    catch (err) {
        return res.status(500).send({
            message: err.message || `Error deleting a category`
        });
    }
 
};



module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
};
