const express = require('express');
const router = express.Router();
const query = require('../dbConnection');


router.post("/bloodbank/new",async(req,res)=>{
    let donar_name = req.body.donar_name;
    let email = req.body.email;
    let donar_address = req.body.donar_address;
    let blood_group = req.body.blood_group;
    let quantity = req.body.quantity;
    let queryString = `insert into donar(donar_name,email,donar_address,blood_group) values ("${donar_name}","${email}","${donar_address}","${blood_group}")`;
    let result = await query(queryString);
    let donar_id=result['insertId'];
    let newdate = new Date();
    newdate = newdate.toISOString().slice(0, 10);
    queryString=`insert into donates_to_bank values(${donar_id},1,${quantity},"${newdate}")`;
    result=await query(queryString);
    queryString=`update blood_bank_storage set quantity=quantity+${quantity} where bank_code=1 and blood_group="${blood_group}"`;
    result=await query(queryString);
    res.json([{"message":"Thanks for donating to bank"}]);
})

router.post("/bloodbank/old/:id/:quantity",async(req,res)=>{
    let donar_id=req.params.id;
    let quantity=req.params.quantity;
    let queryString=`select * from donar where donar_id=${donar_id}`;
    let result=await query(queryString);
    
    if(result.length==0){
        res.json([{"message":"Incorrect donar ID"}]);
    }else{
        let blood_group=result[0]["blood_group"];
        let newdate = new Date();
        newdate = newdate.toISOString().slice(0, 10);
        queryString=`insert into donates_to_bank values(${donar_id},1,${quantity},"${newdate}")`;
        try{
            console.log(queryString);
            result=await query(queryString);
            console.log("after");
            queryString=`update blood_bank_storage set quantity=quantity+${quantity} where bank_code=1 and blood_group="${blood_group}"`;
            result=await query(queryString);
            res.json([{"message":"Thanks for donating to bank"}]);
        }catch{
            res.json([{"message":"you can not donate blood on same day please come after 3 months"}]);
        }
    }
})






router.post('/bloodbank/', async (req, res) => {

});

module.exports = router;