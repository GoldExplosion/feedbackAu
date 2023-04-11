const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
// const { prototype } = require("pg/lib/connection-parameters");

app.use(cors())
app.use(express.json())

//create user 
app.post("/feedback",async (req,res)=>{
    try {
        console.log(req.body);
        // const newUser = await pool.query("select * from pg_catalog.pg_tables;");
        // if(req.body.building == null || typeof req.body.floor == null || typeof req.body.toilet == null){
        //     res.status(422).end();
        //     throw new Error('Invalid input.')
        // }
        console.log(typeof req.body.SecurityAvailability)
        if(typeof req.body.Cobweb != "undefined"){
            console.log("Entered Housekeeping");
            const newUser= await pool.query("INSERT INTO basicInfo (Building, Floor, Name, Phone, Type, SubmitTime) VALUES($1, $2, $3, $4, $5, current_timestamp) RETURNING *",[req.body.building,req.body.floor,req.body.Name,req.body.Phone,req.body.Type]);
            const housekeepingFeedback = await pool.query("INSERT INTO housekeepingForm (ID, Room, Feedback, Cleanliness, Cobwebs, Windows, RoomSwept, RoomMopped, RoomsNotMopped, RoomsNotSwept) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",[newUser['rows'][0]['id'],req.body.room ,req.body.Feedback, req.body.Cleanliness, req.body.Cobwebs, req.body.Windows, req.body.RoomSwept, req.body.RoomMopped, req.body.RoomsNotMopped, req.body.RoomsNotSwept]);
            res.status(200).end();
        }

        else if(typeof req.body.WaterLeakage != "undefined"){
            console.log("Entered Toilet");
            const newUser= await pool.query("INSERT INTO basicInfo (Building, Floor, Name, Phone, Type, SubmitTime) VALUES($1, $2, $3, $4, $5, current_timestamp) RETURNING *",[req.body.building,req.body.floor,req.body.Name,req.body.Phone,req.body.Type, req.body.ItemID]);
            const flush = await pool.query("INSERT INTO toiletForm (ID, Toilet, Cleanliness, \
                Complaint, Flushworking, WashedRegularly, WaterLeakage, WaterSupply) VALUES($1, $2, $3, $4, $5, $6, $7, $8)",[newUser['rows'][0]['id'], req.body.toilet ,req.body.Cleanliness, req.body.Complaint, req.body.FlushWorking, req.body.WashedRegularly, req.body.WaterLekage, req.body.WaterSupply]);
            res.status(200).end()
                // res.json({newUser, flush});
                // console.log(newUser);
                // console.log(newUser['rows'][0]['id'])
        }

        else if(typeof req.body.SecurityAvailability != "undefined"){
            console.log("Entered Security");
            const newUser= await pool.query("INSERT INTO basicInfo (Building,Floor, Name, Phone, Type, SubmitTime) VALUES($1, $2, $3, $4, $5, current_timestamp) RETURNING *",[req.body.gate,req.body.floor,req.body.Name,req.body.Phone,req.body.Type]);
            const security = await pool.query("INSERT INTO securityForm (ID, Booth, Feedback, \
                SecurityAvailability, SecurityMisbehaving, SecurityDrunk, SecurityAlertness, SecurityAvailabilityReason) VALUES($1, $2, $3, $4, $5, $6, $7, $8)",[newUser['rows'][0]['id'],req.body.booth ,req.body.Feedback, req.body.SecurityAvailability, req.body.SecurityMisbehaving, req.body.SecurityDrunk, req.body.SecurityAlertness, req.body.SecurityAvailabilityReason]);
            res.status(200).end();
                // res.json({newUser, flush});
                // console.log(newUser);
                // console.log(newUser['rows'][0]['id'])
        }

        else if(typeof req.body.FoodTaste != "undefined"){
            console.log("Entered food");
            const newUser= await pool.query("INSERT INTO basicInfo (Building, Floor, Name, Phone, Type, SubmitTime) VALUES($1, $2, $3, $4, $5, current_timestamp) RETURNING *",[req.body.fcname,req.body.floor,req.body.Name,req.body.Phone,req.body.Type]);
            const food = await pool.query("INSERT INTO foodForm (ID, stall ,Feedback, \
                Cleanliness, FoodQuality, FoodTaste, ServiceQuality, Ambience) VALUES($1, $2, $3, $4, $5, $6, $7, $8)",[newUser['rows'][0]['id'],req.body.stall, req.body.Feedback, req.body.Cleanliness, req.body.FoodQuality, req.body.FoodTaste, req.body.ServiceQuality, req.body.Ambience]);
            res.status(200).end();
                // res.json({newUser, flush});
                // console.log(newUser);
                // console.log(newUser['rows'][0]['id'])
        }


        
        res.status(406).end();
        // res.json({newUser});
        // res.json(newDept)
        
    } catch (error) {
        console.error(error);
    }
})

//get all users
// app.get("/feedback",async(req,res)=>{
//     try {
//         const allUsers = await pool.query("SELECT * FROM feedback");
//         res.json(allUsers.rows)
//         // res.send(allUsers);
//     } catch (error) {
//         console.error(error);
//     }
// })

//get all departments
// app.get("/department",async(req,res)=>{
//     try {
//         const allUsers = await pool.query("SELECT * FROM department");
//         res.json(allUsers.rows)
//         // res.send(allUsers);
//     } catch (error) {
//         console.error(error);
//     }
// })

//get specific users
// app.get("/feedback/:id",async(req,res)=>{
//     try {
//         const {id}=req.params;
//         const SpecificUser = await pool.query("SELECT * FROM feedback WHERE ID = $1",[id]);
//         res.json(SpecificUser.rows)
//         // res.send(allUsers);
//     } catch (error) {
//         console.error(error);
//     }
// })

//update a user department
// app.put("/feedback/:id",async(req,res)=>{
//     try {
//         const {id}=req.params;
//         const {Department}=req.body;
//         const update= await pool.query("UPDATE feedback SET Feedback = $1 WHERE ID = $2",[Department,id])
//         res.json("Feedback Updated Successfully")

        
//     } catch (error) {
//         console.error(error);
//     }
// })


//delete a user 
// app.delete("/feedback/:id",async(req,res)=>{
//     const {id}=req.params;
//     const deleteUser= await pool.query("DELETE FROM feedback where ID = $1",[id]);
//     res.json("Feedback Deleted")
// })

app.listen(5000, ()=>{
    console.log("server on http://localhost:5000");
})