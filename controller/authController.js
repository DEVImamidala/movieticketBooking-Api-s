const  authmodel = require('../models/authmodel')
class authController{
    async create(req,res){
        const user = req.body;
        try{
            const users = await authmodel.create(user);
            res.status(200).json({status:1,message:'created successfully',users});
        }
        catch(error){
            console.error('error registration  user:',error);
            res.status(500).json({ error: 'Internal Server Error'});
        }
        }
        async register_seats(req,res){
            const user = req.body;
            try{
                const users = await authmodel.register_seats(user);
                res.status(200).json({status:1,message:'inserted',users})
            }
            catch(error){
                console.log(error);
                res.status(400).json({error:'internal server'});
            }
        }
         async getid(req,res){
            const user = req.body;
            try{
                const users= await authmodel.getid(user);
                res.status(200).json({status:1,message:'seat is ',users});
            }
            catch(error){
                console.log(error);
                res.status(400).json({status:0,message:'internal error'})
            }
         }
          async seat(req,res){
            const user = req.body;
            const ull = user.seats.seatno;
   
            try{
                const users = await authmodel.seat(user);
                const wait = ull;
                console.log(wait);
                res.status(200).json({status:1,message:'selected seat is',wait});
            }
            catch(error){
                console.log(error);
                res.status(400).json({status:0,message:'internal error'});
            }
          }
    }

module.exports = new authController;