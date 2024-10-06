const pool = require('../config/dbconn');
class authmodel {
async create(user) {
  const {movies,languages,genres,releasedate,price,shows,director,rating,format,duration} = user;
  const query ='insert into cinema(movies,languages,genres,releasedate,price,shows,director,rating,format,duration) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)';
  const values=[movies,languages,genres,releasedate,price,shows,director,rating,format,duration];
  const {rows}=await pool.query(query,values);
  return rows[0];
  
    }
    catch (error){
        console.log('error registration user:',error);
        throw error;
    }
    async register_seats(user){
      const{showid,shows,seats}= user;
      const query = 'insert into sunk(showid,shows,seats) values ($1,$2,$3)';
      const values = [showid,shows,seats];
      const{rows} = await pool.query( query,values);
      return rows;
    }
    async getid(user){
      const{showid,shows}= user;
      const query = 'select seats from sunk where showid=$1 and shows=$2';
      const {rows}= await pool.query(query,[showid,shows]);
      return rows;
    }
     async seat(user){
      const {showid,shows}= user;
      //const state = seats.seats.seatno;
      const query = 'select seats from sunk where showid=$1 and shows =$2';
      const{rows}= await pool.query(query,[showid,shows]);
      return rows;
     }
}
module.exports = new authmodel;