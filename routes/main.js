const router = require('express').Router();
const Category = require('../node_modules/db_services/lib/models/category');
const Dish = require('../node_modules/db_services/lib/models/dish');
const News = require('../node_modules/db_services/lib/models/news');

router.route('/')
    .get(async function (req, res) {
        try {
            const categories = await Category.find({});
            const news = await News.find({}).sort({date: -1});
            const dishesByCategory = categories.map(async function(item)
            {
                const dishes = await Dish.find({ category: item._id });
                return {"category": item.title, "dishes": dishes}
            });
            const dishes=await Promise.all(dishesByCategory);
            res.render('index', {
                menu: dishes,
                news: news
            })
        }
        catch (err) {
            return res.status(500).send(err);
        }
    });
module.exports = router;