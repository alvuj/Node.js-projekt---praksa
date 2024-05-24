const express = require('express');
const router = express.Router();
const db = require('../connections');

const mysql = require('mysql');

var iznajmljivanje = {
  /**
* @api {post} /sva_iznajmljivanja sva_iznajmljivanja
* @apiName svaiznajmljivanja
* @apiGroup iznajmljivanje
* @apiVersion 0.0.1
* @apiSuccessExample {json} Success:
* {
"success": true,
"data": [
  {
    "id_iznam": 1,
    "apartman": "Kraljević d.o.o.",
    "datum_od": "2019-04-27T22:00:00.000Z",
    "datum_do": "2019-04-23T22:00:00.000Z",
    "ime_kupca": "Marko",
    "prezime_kupca": "Marić",
    "iznajmio": ""
  },
],
"message": "Uspješno"
}
*/
  //* @apiSampleRequest off

  sva_iznajmljivanja: function (req, res, next) {
    try {
      let sql = `SELECT i.*, a.naziv, CONCAT(k.ime, ' ',  k.prezime) AS Iznajmio FROM iznajmljivanje AS i RIGHT JOIN apartmani AS a ON i.id_ap = a.id_ap RIGHT JOIN korisnici AS k ON i.id_kor = k.id_kor WHERE i.id_ap = a.id_ap AND i.id_kor=k.id_kor`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
          res.json({ success: false, data: result, message: "Nema iznajmljivanje u bazi" });
        } else {
          res.json({ success: true, data: result, message: "Uspješno" });
        }
      });
    } catch (err) {
      res.send(err);
    }
  },

  /**
* @api {post}  /dodaj_uredi_iznajmljivanje dodaj_uredi_iznajmljivanje
* @apiName dodajurediiznajmljivanje
* @apiDescription SQL unos, oblika 
    
    {"id_ap": 13,
    "datum_od": "2019-04-28",
    "datum_do": "2019-04-24",
    "ime_kupca": "Majmunko",
    "prezime_kupca": "Majmunkic",
    "id_kor": 3
    }
* @apiGroup iznajmljivanje
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

  dodaj_uredi_iznajmljivanje: function (req, res, next) {
    if (Object.keys(req.body).length === 0) {
      return res.json({ success: false, message: "Nisu poslani potrebni podatci" });
    }
    //destructuring
    let { id_iznam, id_ap, ime_kupca, prezime_kupca, datum_od, datum_do, id_kor } = req.body;

    

  

    
      


        // for (let i = 0; i < results.length; i++){
        //   var res = res[i];
        //   console.log(res);
        // }

        // console.log(results);

        // let is_admin = results[0].admin;
        // let ime_ap_po_id = results[0].naziv;
        // let ime_po_id = results[0].ime;
        // let prezime_po_id = results[0].prezime;
        // let spojeno = ime_po_id + " " + prezime_po_id;
        // console.log(spojeno);


        //gleda row admin u tablici korisnici
        // if (is_admin != 1) {
        //   return res.json({ success: false, message: "Korisnik nema admin prava!" });
        // } else {
        //   console.log("nije admin");
        // }


        // let sql_insert_apartman = `INSERT INTO apartmani (naziv, adresa, lokacija, vrsta_apartmana, broj_kreveta) VALUES (?, ?, ?, ?, ?)`;
        let sql_insert_apartman = `REPLACE INTO iznajmljivanje (id_iznam, id_ap, datum_od, datum_do, ime_kupca, prezime_kupca, id_kor) VALUES (?, ?, ?, ?, ?, ?, ?)`;

        db.query(sql_insert_apartman, [id_iznam, id_ap, datum_od, datum_do, ime_kupca, prezime_kupca, id_kor], (err, rez) => {
          if (err) {
            console.error(err);
            return res.json({ success: false, message: err.message });
          }
          res.json({ success: true, data: rez, message: "iznajmljivanje uspješno dodano" });
        });
      },

      /**
* @api {post}  /deleteiznajmljivanje deleteiznajmljivanje
* @apiName delete_iznajmljivanje
* @apiDescription Brisanje iz tablice "iznajmljivanje" unosa koji nemaju dobre vanjske ključeve
    
    {
"id_iznam": 24

    }
* @apiGroup iznajmljivanje
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



  //staro moje
      // delete_iznajmljivanje: function (req, res, next) {
      //   try {
      //     let sql = `SELECT i.*, a.naziv, CONCAT(k.ime, ' ',  k.prezime) AS Iznajmio 
      //     FROM iznajmljivanje AS i 
      //     RIGHT JOIN apartmani AS a ON i.id_ap = a.id_ap 
      //     RIGHT JOIN korisnici AS k ON i.id_kor = k.id_kor 
      //     WHERE id_iznam = ${req.body.id_iznam}`;

      //     //let sql = `DELETE FROM iznajmljivanje WHERE id_iznam = ${req.body.id_iznam}`;
      //     db.query(sql, (err, result) => {
      //       if (err) throw err;
      //       if (result.length == 0) {
      //        // let sql = `DELETE FROM iznajmljivanje WHERE id_iznam = ${req.body.id_iznam}`;
      //        res.json({ success: true, data: result, message: " Simulacija brisanja" });

      //        /* db.query(sql, (err, result) => {
              
      //         });*/
      //       } else {
      //         res.json({ success: true, data: result, message: "Nije obrisano, sadrži valjane vanjske ključeve" });
      //       }
      //     });
      //   } catch (err) {
      //     res.send(err);
      //   }
      // },

      delete_iznajmljivanje: function (req, res, next) {
        try {
          // SQL upit koji provjerava postoje li povezani zapisi
          let sql = `SELECT i.*, a.naziv, CONCAT(k.ime, ' ', k.prezime) AS Iznajmio 
                     FROM iznajmljivanje AS i 
                     RIGHT JOIN apartmani AS a ON i.id_ap = a.id_ap 
                     RIGHT JOIN korisnici AS k ON i.id_kor = k.id_kor 
                     WHERE id_iznam = ?`;
      
          // Izvršavanje provjeravajućeg SQL upita
          db.query(sql, [req.body.id_iznam], (err, result) => {
            if (err) throw err;
      
            // Ako nema povezanih zapisa, može se izvršiti brisanje
            if (result.length == 0) {
              let sqlDelete = `DELETE FROM iznajmljivanje WHERE id_iznam = ?`;
              db.query(sqlDelete, [req.body.id_iznam], (err, result) => {
                if (err) {
                  return res.json({ success: false, message: err.message });
                }
                res.json({ success: true, message: "Iznajmljivanje uspješno obrisano" });
              });
            } else {
              // Ako postoje povezani zapisi, ne izvršava se brisanje
              res.json({ success: true, data: result, message: "Nije obrisano, sadrži valjane vanjske ključeve" });
            }
          });
        } catch (err) {
          res.send(err);
        }
      },
      
      
  
  








//staro dodaj_uredi_iznajmljivanje koje još prima iznajmio pa joina

/*
  dodaj_uredi_iznajmljivanje: function (req, res, next) {
    if (Object.keys(req.body).length === 0) {
      return res.json({ success: false, message: "Nisu poslani potrebni podatci" });
    }
    //destructuring
    let { id_iznam, id_ap, ime_kupca, prezime_kupca, datum_od, datum_do, id_kor } = req.body;

    let sql_ime_lokacije = `SELECT a.naziv, k.ime, k.prezime, k.admin
                                FROM apartmani AS a, korisnici AS k 
                                WHERE a.id_ap = ${id_ap} AND k.id_kor = ${id_kor}`;

    console.log(sql_ime_lokacije);

    db.query(sql_ime_lokacije, [id_ap, id_kor], (err, results) => {
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

        let is_admin = results[0].admin;
        let ime_ap_po_id = results[0].naziv;
        let ime_po_id = results[0].ime;
        let prezime_po_id = results[0].prezime;
        let spojeno = ime_po_id + " " + prezime_po_id;
        console.log(spojeno);


        //gleda row admin u tablici korisnici
        if (is_admin != 1) {
          return res.json({ success: false, message: "Korisnik nema admin prava!" });
        } else {
          console.log("nije admin");
        }


        // let sql_insert_apartman = `INSERT INTO apartmani (naziv, adresa, lokacija, vrsta_apartmana, broj_kreveta) VALUES (?, ?, ?, ?, ?)`;
        let sql_insert_apartman = `REPLACE INTO iznajmljivanje (id_iznam, apartman, datum_od, datum_do, ime_kupca, prezime_kupca, iznajmio) VALUES (?, ?, ?, ?, ?, ?, ?)`;

        db.query(sql_insert_apartman, [id_iznam, ime_ap_po_id, datum_od, datum_do, ime_kupca, prezime_kupca, spojeno], (err, rez) => {
          if (err) {
            console.error(err);
            return res.json({ success: false, message: err.message });
          }
          res.json({ success: true, data: rez, message: "iznajmljivanje uspješno dodano" });
        });
      } else {
        return res.json({ success: false, message: "Ne postoje podaci za zadane ID-ove lokacije i vrste apartmana" });
      }
    });
  }
*/
}

module.exports = iznajmljivanje;


//provjera 
/*
dodaj_apartman: function(req, res, next) {
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

}
*/