const  usermodel = require('../models/usermodel')
class userController{
    async register(req,res){
        const user = req.body;
        try{
            const users = await usermodel.register(user);
            res.status(200).json({status:1,message:'created successfully',users});
        }
        catch(error){
            console.error('error registration  user:',error);
            res.status(500).json({ error: 'Internal Server Error'});
        }
        }
        async login(req,res){
            const user = req.body;
            const{email}=user;
            try{
                const users = await usermodel.login(user);
                const movie = await usermodel.display(user);
                res.status(200).json({status:1,message:`${email},login successfully`,movie});
            }
            catch(error){
                console.error('error registration  user:',error);
                res.status(500).json({ error: 'Internal Server Error'});
            }
            }
        async id(req,res){
            const id = req.params.id;
            console.log(id);
            try{
                const users = await usermodel.id({id});
                const movieid = users.id;
                const  name = users.movies;
                const theatre = await usermodel.theatresdisplay();
               res.status(200).json({status:1,message:`the related id's are`,movieid,name,theatre});
            }
            catch(error){
                console.error(error);
                res.status(400).json({status:0,message:`error occured`});
            }
        }
         
        async languages(req, res)  {
            const selectedLanguages = req.params.languages; 
            try {
                const movies = await usermodel.languages(selectedLanguages);
                // console.log('movies');
                res.status(200).json({ status: 1, message: `Movies in ${selectedLanguages}`, movies });
            } catch (error) {
                console.error(error);
                res.status(400).json({ status: 0, message: 'Movies not available' });
            }
        }
        // async genres(req,res){
        //     const genres =req.params.genres;
        //     try{
        //         const movies1 = await usermodel.genres(genres);
        //         res.status(200).json({status:1,message:`the genre is ${genres}`, movies1 });
        //     }
        //     catch(error){
        //         console.error(error);
        //         res.status(400).json({ status: 0, message: 'genres not available' });
        //     }
        // }

        async genres(req, res) {
            const selectedLanguages = req.params.languages;
            const genres = req.params.genres;
        
            try {
                const moviesByLanguage = await usermodel.languages(selectedLanguages);
                const filteredMoviesByGenres = moviesByLanguage.filter(movie => movie.genres.includes(genres));
        
                res.status(200).json({ status: 1, message: `Movies in ${selectedLanguages} with genre ${genres}`, movies: filteredMoviesByGenres });
            } catch (error) {
                console.error(error);
                res.status(400).json({ status: 0, message: 'Genres not available' });
            }
        }
        async moviename(req,res){
            const movies  =req.params.movies;
           
            try{
                const users = await usermodel.moviename(movies);
                res.status(200).json({status:1,message:'selected movie details',users});
            }
            catch(error){
                console.error(error);
                res.status(404).json({status:0,message:'server error'});
            }
        }
        async shows(req,res){
            const shows = req.params.shows;
            // console.log('hello');return;
            try{
                const users = await usermodel.shows(shows);
                
                res.status(200).json({status:1,message:`movie shows `,users});
            }
            catch(error){
                res.status(400).json({status:0,message:`shows not available `})
            }
        }
        async theatres(req,res){
            const user = req.body;
            try{
                const users = await usermodel.theatres(user);
                res.status(200).json({status:1,message:`json created`,users});
            }
            catch(error){
                console.error(error);
                res.status(400).json({status:0,message:`error occured`});

            }
        } 
        async  screen(req, res) {
            const showid = parseInt(req.body.showid, 10);
          
            try {
              const user = await usermodel.screen({ showid });
              res.status(200).json({ status: 1, message: `Available screens and selected the screen id`, user });
            } catch (error) {
              console.error(error);
              res.status(400).json({ status: 0, message: `Error occurred` });
            }
          }
          async showtype(req,res){
           const showss = req.body;  
            try{
                const user = await usermodel.showtype(showss);
                
                console.log(user);
                res.status(200).json({status:1,message:`showtype is`,user})
            }
            catch(error){
                console.error(error);
                res.status(400).json({status:0,message:`error occured`});
            }
          }
          async seatsselection(req,res){
            const seack = req.body;
        
            const seat = seack.seat;
            
            const noofseats = seack.seats.length;
 
            
            const seatno = seack.seatno;
            
            try{
                if(noofseats <=5)
                {
                //const existdata = await usermodel.updateselection(seack);
                const state = await usermodel.seatsselection(seack);
              
                let price = 0;
                for (let index = 0; index <seack.seats.length; index++){
                   
                const seatss = seack.seats[index];
                const seats = state.seats.seats[seatss.seat][seatss.seatno];
                price = price+seats.price;
               
                
                }
                return res.status(200).json({status:1,message:`total amount ${price} booking successfull`});
                
                }
                else{
                    res.status(400).json({status:0,message:'limit has exhibited'});
                }

               
            }
  
            catch(error){
                console.error(error);
                res.status(400).json({status:0,message:'error ocuured'});
            }
          }
    
   
      
   
    }
        
        
        
        

module.exports = new userController;