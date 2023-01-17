const { Router } = require('express');
const router = Router();
const getTemps = require("../controllers/getTemps.js");


router.get("/", async (req, res) => {
    try {
        const allTemperaments = await getTemps()
        res.status(200).json(allTemperaments);
    } catch (error) {
        res.status(400).json({error: error.message});
    };
});

module.exports = router;