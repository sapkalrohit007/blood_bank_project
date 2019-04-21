const express=require('express');
const router = express.Router();
const query=require('../dbConnection');



router.get('/history/:id',async(req,res)=>{
    let receiver_id=req.params.id;

    let queryString=`select receiver_name,receiver_address,age,sex,bank_name,bank_address,blood_group,quantity,date
                     from receiver rec inner join history_table history on  rec.receiver_id=history.receiver_id
                     inner join blood_bank bank on bank.bank_code=history.bank_code 
                     where rec.receiver_id=${receiver_id};`
    let result=await query(queryString);
    if(result.length==0){
        res.status(404).send("The receiver with given id does not found!!");
        return;
    }
    res.send(result);
});

router.post('/getblood',async(req,res)=>{
    
});

router.post('/getblood/:id',async()=>{

});

module.exports=router;