const pool = require('../config/dbconn');
class usermodel {
async register(user) {
    const{name,email,phnnumber,password} = user;
    const query = 'INSERT INTO cinemauser(name,email,phnnumber,password) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name,email,phnnumber,password];
    const { rows } = await pool.query(query, values);
    return rows[0];
    }
    catch (error){
        console.log('error registration user:',error);
        throw error;
    }

    async login(user) {
        const{email,password} = user;
        const query = 'SELECT * FROM cinemauser WHERE email=$1 and password=$2';
        const values = [email,password];
        const { rows } = await pool.query(query, values);
        return rows[0];
        }
        catch (error){
            console.log('error registration user:',error);
            throw error;
        }

        async id({id}){
            const query = 'select * from cinema where id = $1';
            try{
                const { rows } = await pool.query(query,[id]);
               
                return rows.length>0 ? rows[0] : 'id not available';
            }
            catch(error){
                console.error(error);
                throw error;
        
            }
        }
        async display(){
            const query ='select * from cinema';
            const { rows } = await pool.query(query);
                    return rows;
                }

        async languages(selectedLanguages) {
            const query = 'SELECT * FROM cinema WHERE languages LIKE $1';
            const searchString = `%${selectedLanguages}%`;
        
            try {
                const { rows } = await pool.query(query, [searchString]);
                return rows;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        async moviename(movies){
       
            const query ='select * from cinema where movies = $1';
         
            const{rows}=await pool.query(query,[movies]);
            console.log(rows)
            return rows.length>0 ? rows[0] : 'movie not available';
                 
    }
    async shows(shows){
        const query = 'select * from cinema where shows LIKE $1';
        const  movieshow =`%${shows}%`;
        // console.log(movieshow);return;
        const {rows}= await pool.query(query,[movieshow]);
        return rows;
    }
    async theatres(user){
        const {showid,firstshow,matinee,secondshow} =user;
        const query = 'insert into shows(showid,firstshow,matinee,secondshow) values($1,$2,$3,$4) RETURNING *';
        const values = [showid,firstshow,matinee,secondshow];
        const {rows}= await pool.query(query,values);
        return rows; 
    }
    async theatresdisplay(){
        const query = 'select * from theatre';
        const {rows} = await pool.query (query);
        return rows;
    }
    
    async screen({ showid }) {
        const query = 'select * from showss where showid = $1';
        try {
            const { rows } = await pool.query(query, [showid]);
            return rows.length > 0 ? rows[0] : 'Id not available';
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    
    async showtype(showss) {
        const { showid,shows } = showss;
        const query = 'SELECT seats FROM showss WHERE showid = $1 AND shows = $2';
        const result = await pool.query(query, [showid, shows]);
        return result.rows[0];
      }

    
    async seatsselection(seack) {
        const{showid, shows}= seack;
        try {
          const query = "SELECT seats FROM showss WHERE showid = $1 AND shows = $2";
          const { rows } = await pool.query(query, [showid, shows]);
          return rows[0];
        } catch (error) {
          throw error;
        }
      }
    //   async  updateselection(seack){
    //     const{showid,shows,seats} = seack;
    //     const query = "UPDATE showss SET seats = $1 WHERE showid = $2 AND shows = $3";
    //     //const updateQuery = "UPDATE showss SET seats = $1 WHERE showid = $2 AND shows = $3";
    //     const {rows} =await pool.query(query, [ seats,showid, shows]);
    //     return rows[0];


    //   }
   
      
      
      
      
      
        
      
    }

    
    
    


                        

 module.exports = new usermodel;




 
 
 
 
 
 
 
    
    
    
    
    

                
    

