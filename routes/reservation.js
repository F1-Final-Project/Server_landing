//          /reservation
const router = require('express').Router();
const Reserved = require('db-schemas/lib/models/reserved');

router.route('/')
	.get(async function (req, res) {
		try {
			const reserved = await Reserved.find({});
			await res.json(reserved);
		}
		catch (err) {
			return res.status(500).send(err);
		}
	})
	.post(async function (req, res) {
		try {
			const reservedData = req.body;
			const newReserved = new Reserved({
				date: reservedData.date,
				table: reservedData.table,
				client: reservedData.client,
				phone: reservedData.phone
			});

			await newReserved.save();
			await res.json(newReserved);

		} catch (err) {
			return res.status(500).send(err);
		}
	});

module.exports = router;