const Menu = require('../../models/menu');
const fs = require('fs');
/******* CREATE *******/

const createMainCategory = async (req, res) => {
    console.log(req.body);

    const newMainCategory = new Menu({
        mainCategoryName: req.body.mainCategoryName,
        categories: req.body.categories
    });

    try {
        const data = await newMainCategory.save();
        res.status(201).send(data);
    }
    catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating a main category'
        });
    }
    
};

/******* Read *******/

const getMainCategories = async (req, res) => {
    
    try {
        const data = await Menu.find();
        res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send({
            message: err.message || "Error occurred"
        });
    }
};

const getMainCategory = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await Menu.findById(id);
        if (!data) {
            return res.status(404).send({
                message: `No Main Category with id ${id} found!`
            });
        }
        res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send({
            message: err.message || 'Error occurred when getting a main category'
        });
    }
};


/******* Update *******/
const updateMainCategory = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    try {
        const data = await Menu.findByIdAndUpdate(id, updates, { new: true });
        if (!data) {
            return res.status(404).send({
                message: `No Main Category with ${id} found!`
            });
        }

        res.status(200).send({
            message: `Main category with id ${id} updated`
        });
    }
    catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while updating a main category'
        });
    }
};


/******* Delete *******/
const deleteMainCategory = async (req, res) => {
    const id = req.params.id;

    try {

        const mainCategory = await Menu.findById(id);
        if (!mainCategory) {
            return res.status(404).send({
                message: `No Main Category with ${id} found!`
            });
        }

        // remove image by image name from imagepath
        let imgLinks = []
        const categories = mainCategory.categories;
        for (let category of categories) {
            imgLinks.push(category.imagePath);
            for (let subCategory of category.subCategories) {
                for (let product of subCategory.products) {
                    imgLinks.push(product.imagePath);
                }
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

        await Menu.findByIdAndDelete(id);

        res.send({
            message: `Main category with id ${id} deleted`
        });
    }
    catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while deleting a main category'
        });
    }
};



module.exports = {
    createMainCategory,
    getMainCategories,
    getMainCategory,
    updateMainCategory,
    deleteMainCategory
};
