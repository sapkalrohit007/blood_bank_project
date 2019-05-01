const express = require("express");
const router = express.Router();
const query = require("../dbConnection");

router.get("/report/:id", async (req, res) => {
  let bank_id = req.params.id;
  var queryString = `select blood_group,quantity 
                    from blood_bank bank inner join blood_bank_storage storage on bank.bank_code=storage.bank_code 
                    where bank.bank_code=${bank_id}`;

  let result = await query(queryString);
  if (result.length == 0) {
    // res.status(404).send('Blood Bank with given id does not exists');
res.json([]);
    return;
  }
    res.send(result);
});

module.exports = router;