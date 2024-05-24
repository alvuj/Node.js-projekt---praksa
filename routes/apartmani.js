const express = require('express');
const router = express.Router();
const db = require('../connections');
// Require library
//var xl = require('excel4node');
const mysql = require('mysql');

var apartmani = {
    /**
 * @api {post} /sviapartmani sviapartmani
 * @apiName sviapartmani
 * @apiGroup apartmani
 * @apiVersion 0.0.1
 * @apiSuccessExample {json} Success:
 * {
  "success": true,
  "data": [
    {
      "id_ap": 1,
      "naziv": "Kraljević d.o.o.",
      "id_lok": 38,
      "adresa": "Jagodnjak 3b/6, 62783 Krk",
      "id_vrst_ap": 4,
      "broj_kreveta": 2
    }
  ],
  "message": "Uspješno"
}
*/
//* @apiSampleRequest off

    svi_apartmani: function(req, res, next){
        try {
            let sql = 'SELECT * FROM apartmani LEFT JOIN lokacija ON apartmani.id_lok = lokacija.id_lok LEFT JOIN vrste_apartmana ON apartmani.id_vrst_ap = vrste_apartmana.id_vrst_ap';
            db.query(sql, (err, result) => {
                if (err) throw err;
                if (result.length == 0) {
                    res.json({ success: false, data: result, message: "Neuspješno" });
                } else {
                    res.json({success: true, data: result, message: "Uspješno"});
                }
            });
        } catch(err) {
            res.send(err);
        }
    },


   

/**
 * @api {post} /dodajurediapartman dodajurediapartman
 * @apiName dodaj_uredi_apartman
 * @apiGroup apartmani
 * @apiDescription Omogućuje dodavanje i uređivanje apartmana
   
    {
    "naziv": "Brljetić",
    "adresa": "Dubrovačka 23",
    "id_lok": 3,
    "id_vrst_ap": 3,
    "broj_kreveta": 3
    }
 * @apiVersion 0.0.1
 * @apiBody {int} id_ap (optional), {string} naziv, {string} adresa, {int} id_lok, {int} id_vrst_ap, {int} broj_kreveta
 * @apiSuccessExample {json} Success:
 * {
  "success": true,
  "data": {
    "fieldCount": 0,
    "affectedRows": 2,
    "insertId": 553125,
    "serverStatus": 2,
    "warningCount": 0,
    "message": "",
    "protocol41": true,
    "changedRows": 0
  },
  "message": "Uspješno"
}
*/
//* @apiSampleRequest off

dodaj_uredi_apartman: function(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return res.json({ success: false, message: "Nisu poslani potrebni podatci" });
  }
  //destructuring
  let { id_ap, naziv, adresa, id_lok, id_vrst_ap, broj_kreveta} = req.body;

     let sql_insert_apartman = `REPLACE INTO apartmani (id_ap, naziv, adresa, id_lok, id_vrst_ap, broj_kreveta) VALUES (?, ?, ?, ?, ?, ?)`;

      db.query(sql_insert_apartman, [id_ap, naziv, adresa, id_lok, id_vrst_ap, broj_kreveta], (err, rez) => {
        if (err) {
          console.error(err);
          return res.json({ success: false, message: err.message });
        }
        res.json({ success: true, data: rez, message: "Apartman uspješno dodan" });
      });
    },
  


/**
* @api {post}  /deleteapartman deleteapartman
* @apiName delete_apartman
* @apiDescription Brisanje iz tablice "apartmani" unosa koji nemaju dobre vanjske ključeve
    
  {
  "id_ap":51
   }

* @apiGroup apartmani
* @apiVersion 0.0.1
* @apiBody json
* @apiSuccessExample {json} Success:
* {
"success": true,
"data": {
  "fieldCount": 0,
  "affectedRows": 1,
  "insertId": 19,
  "serverStatus": 2,
  "warningCount": 0,
  "message": "",
  "protocol41": true,
  "changedRows": 0
},
"message": "iznajmljivanje uspješno dodano"
}
*/
  //* @apiSampleRequest off


    delete_apartman: function (req, res, next) {
      try {
        let sql = `SELECT * FROM apartmani 
        RIGHT JOIN lokacija ON apartmani.id_lok = lokacija.id_lok 
        RIGHT JOIN vrste_apartmana ON apartmani.id_vrst_ap = vrste_apartmana.id_vrst_ap
         WHERE id_ap = ${req.body.id_ap}`;

        //let sql = `DELETE FROM iznajmljivanje WHERE id_iznam = ${req.body.id_iznam}`;
        db.query(sql, (err, result) => {
          if (err) throw err;
          if (result.length == 0) {
            //let sql = `DELETE FROM apartmani WHERE id_ap = ${req.body.id_ap}`;
           res.json({ success: true, data: result, message: " Simulacija brisanja" });

            db.query(sql, (err, result) => {
            
            });
          } else {
            res.json({ success: true, data: result, message: "Ima valjane vanjske ključeve" });
          }
        });
      } catch (err) {
        res.send(err);
      }
    },

































//stari dodaj apartman u kojem uzima iz tablice lokacija i vrsta apartmana i direktno upisuje 

/*dodaj_apartman: function(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return res.json({ success: false, message: "Nisu poslani potrebni podatci" });
  }
//destructuring
  let { id_ap, naziv, adresa, id_lok, id_vrst_ap, broj_kreveta} = req.body;

  let sql_ime_lokacije = `SELECT l.ime_lokacije, v.vrsta_apartmana 
                          FROM lokacija l 
                          JOIN vrste_apartmana v ON l.id_lok = ? AND v.id_vrst_ap = ?`;

  db.query(sql_ime_lokacije, [id_lok, id_vrst_ap], (err, results) => {
    if (err) {
      console.error(err);
      return res.json({ success: false, message: err.message });
    }
   
    if (results.length > 0) {

    // for (let i = 0; i < results.length; i++){
    //   var res = res[i];
    //   console.log(res);
    // }

    console.log(results);
      

      let lokacija = results[0].ime_lokacije;
      let vrstaApartmana = results[0].vrsta_apartmana;


     // let sql_insert_apartman = `INSERT INTO apartmani (naziv, adresa, lokacija, vrsta_apartmana, broj_kreveta) VALUES (?, ?, ?, ?, ?)`;
     let sql_insert_apartman = `REPLACE INTO apartmani (id_ap, naziv, adresa, id_lok, id_vrst_ap, lokacija, vrsta_apartmana, broj_kreveta) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      db.query(sql_insert_apartman, [id_ap, naziv, adresa, id_lok, id_vrst_ap, lokacija, vrstaApartmana, broj_kreveta], (err, rez) => {
        if (err) {
          console.error(err);
          return res.json({ success: false, message: err.message });
        }
        res.json({ success: true, data: rez, message: "Apartman uspješno dodan" });
      });
    } else {
      return res.json({ success: false, message: "Ne postoje podaci za zadane ID-ove lokacije i vrste apartmana" });
    }
  });
},*/

    

























































dodaj_apartman1 : function(req, res, next) {
        if (Object.keys(req.body).length === 0) {
          return res.json({ success: false, message: "No data provided" });
        }else if (req.body == null){
            console.log("Nisu poslani potrebni podatci!");
        }
        
        let param1 = req.body.id_lok;
        let param2 = req.body.id_vrst_ap;
        
        let sql_ime_lokacije = `SELECT l.lokacija , v.vrsta_apartmana 
        FROM lokacija as l, vrsta_apartmana as v WHERE id_lok = ${param1} AND WHERE id_vrst_ap = ${param2}`;
       // let sql_vrsta_apartmana = mysql.format(`SELECT vrsta_apartmana FROM vrste_apartmana WHERE id_vrst_ap = ?`, param2);
       db.query(sql_ime_lokacije, (err, rez) => {
        if (err) {
         // return res.json({ success: false, message: err.message });
        }
        console.log("rez je" + rez);      });
        console.log(sql_ime_lokacije);
       

        let table = [req.body];
        
        console.log(table + "šta je u table");
        let sql = `INSERT INTO apartmani SET ? SELECT vrsta_apartmana FROM vrste apartmana WHERE id_vrst_ap = ${param2} `;
        
        sql = mysql.format(sql, table);
        console.log(sql + " sql1");
       // console.log(sql1 +"sql1");

        sql = mysql.format(sql, sql_ime_lokacije);
       
        console.log(req.body);
        console.log(sql);
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }
    res.json({ success: true, data: result, message: "Uspješno" });
  });
      },

      dodaj_apartman2: function(req, res, next) {
        if (Object.keys(req.body).length === 0) {
          return res.json({ success: false, message: "No data provided" });
        }
      
        let param1 = req.body.id_lok;
        let param2 = req.body.id_vrst_ap;
        
        // Pretpostavljam da tablica 'lokacija' ima stupac za ime lokacije, npr. 'ime_lokacije'
        let sql_ime_lokacije = `SELECT l.ime_lokacije, v.vrsta_apartmana 
                                FROM lokacija as l 
                                JOIN vrste_apartmana as v ON v.id_vrst_ap = ?
                                WHERE l.id_lok = ?`;
      
        db.query(sql_ime_lokacije, [param2, param1], (err, rez) => {
          if (err) {
            return res.json({ success: false, message: err.message });
          }
          
          if(rez.length > 0) {
            let lokacija = rez[0].ime_lokacije;
            let vrstaApartmana = rez[0].vrsta_apartmana;
      
            let newApartment = {
              naziv: req.body.naziv,
              adresa: req.body.adresa,
              lokacija: lokacija,
              vrsta_apartmana: vrstaApartmana,
              broj_kreveta: req.body.broj_kreveta
              // Dodajte ostale potrebne atribute ovdje
            };
      
            let sql = `INSERT INTO apartmani (naziv, adresa, lokacija, vrsta_apartmana, broj_kreveta) VALUES (?, ?, ?, ?, ?)`;
            db.query(sql, [newApartment.naziv, newApartment.adresa, newApartment.lokacija, newApartment.vrsta_apartmana, newApartment.broj_kreveta], (err, result) => {
              if (err) {
                return res.json({ success: false, message: err.message });
              }
              res.json({ success: true, data: result, message: "Uspješno dodano" });
            });
          } else {
            return res.json({ success: false, message: "Nepostojeći id_lok ili id_vrst_ap" });
          }
        });
      },

      /*{
  "naziv": "naziv 2",
  "adresa": "adresa 2",
  "id_lok": 2,
  "id_vrst_ap": 2,
  "broj_kreveta": 2
}*/

      
      
      

}

module.exports = apartmani;


//provjera 

/*dodaj_apartman: function(req, res, next) {
  // Lista svih obaveznih polja
  const obaveznaPolja = ["naziv", "adresa", "id_lok", "id_vrst_ap", "broj_kreveta"];

  // Provjera da li su sva obavezna polja prisutna
  for (const polje of obaveznaPolja) {
    if (!req.body[polje]) {
      return res.status(400).json({ 
        success: false, 
        message: `Nedostaje obavezno polje: ${polje}` 
      });
    }
  }

  let { naziv, adresa, id_lok, id_vrst_ap, broj_kreveta } = req.body;

  // ... Ostatak funkcije za dodavanje apartmana
}
*/