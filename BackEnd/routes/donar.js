const express=require('express');
const router = express.Router();
const query=require('../dbConnection');


router.post('/bloodbank',async(req,res)=>{
    let donar_name=req.body.donar_name;
    let email=req.body.email;
    let donar_address=req.body.donar_address;
    let blood_group=req.body.blood_group;
    let quantity=req.body.quantity;
    let queryString=`select * from donar where email="${email}"`;
    let donar_result=await query(queryString);
    if(donar_result.length==0){
        let insertIntoDonarQueryString=`insert into donar(email,donar_address,blood_group,donar_name) values("${email}","${donar_address}","${blood_group}","${donar_name}")`;
        let result=await query(insertIntoDonarQueryString);
        let insertIntoDonatesToBank=`insert into donates_to_bank(donar_id,bank_code,quantity,date) values(${result.insertId},1,${quantity},${Date.now()})`;
        let result_insert_into_bank=await query(insertIntoDonatesToBank);
        let insertIntoBank=`update blood_bank_storage set quantity=quantity+${quantity} where blood_group='${blood_group}'`;
        let insertIntoBank_result=query(insertIntoBank);
        res.send("Thanks for Donating blood!!!!!");
    }else{
        // console.log(donar_result  donar_id);
        console.log(donar_result[0].donar_id);
        console.log("inside else");
        newdate = new Date();
        newdate = newdate.toISOString().slice(0,10);
        try{
            let insertIntoDonatesToBank=`insert into donates_to_bank(donar_id,bank_code,quantity,date) values(${donar_result[0].donar_id},1,${quantity},"${newdate}")`;
            console.log(insertIntoDonatesToBank);
            let result_insert_into_bank=await query(insertIntoDonatesToBank);
        }catch{
            res.send("You can not donate on the same day...Please Donate after 3 months");
            return;
        }
        console.log("after");
        let insertIntoBank=`update blood_bank_storage set quantity=quantity+${quantity} where blood_group='${blood_group}'`;
        let insertIntoBank_result=query(insertIntoBank);
        // res.send("Thanks for Donating blood!!!!!");
        res.send("Thanks for Donating blood!!!");
    }
});








router.post('/bloodbank/',async(req,res)=>{

});

module.exports=router;