const express=require('express');
const router = express.Router();
const query=require('../dbConnection');


router.get('/report/:id',async(req,res)=>{
    let inventory_id=req.params.id;
    var queryString=`select location,blood_group,quantity 
                    from blood_inventory inventory inner join blood_inventory_storage storage on inventory.inventory_id=storage.inventory_id 
                    where inventory.inventory_id=${inventory_id}`;
    let result=await query(queryString);
    if(result.length==0){
        res.status(404).send('Blood Inventory with given id does not exists');
        return;
    }
    res.send(result);
});


module.exports=router;