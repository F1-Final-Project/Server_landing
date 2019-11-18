const router = require('express').Router();
const Category = require('db-schemas/lib/models/category');
const Dish = require('db-schemas/lib/models/dish');

router.route('/')
    .get(async function (req, res) {

        try {
            const categories = await Category.find({});
            const dishesByCategory = categories.map(async function(item)
            {
                const dishes = await Dish.find({ category: item._id });
                return {"category": item.title, "dishes": dishes}
            });
            const dishes=await Promise.all(dishesByCategory);
            res.render('index', {
                menu: dishes
            })
        }
        catch (err) {
            return res.status(500).send(err);
        }
    });
