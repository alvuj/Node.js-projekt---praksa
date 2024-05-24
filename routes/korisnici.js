const express = require('express');
const router = express.Router();
const db = require('../connections');
const mysql = require('mysql');

var korisnici = {

/**
 * @api {post} /svi_korisnici svi_korisnici
 * @apiName svi_korisnici
 * @apiGroup korisnici
 * @apiVersion 0.0.1
 * @apiSuccessExample {json} Success:
 * {
  "success": true,
  "data": [
    {
      "id_kor": 1,
      "ime": "Izmjena",
      "prezime": "Izmjenić",
      "OIB": 2147483647,
      "email": "iz.iz@mail.com",
      "lozinka": "password123",
      "admin": 0
    }
  ],
  "message": "Prikaz svih korisnika"
}
  ],
  "message": "Uspješno"
}
*/
//* @apiSampleRequest off

    svi_korisnici: function(req, res, next){
        try {
            let sql = 'SELECT * FROM korisnici';
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
 * @api {post} /svi_korisnici_admin svi_korisnici_admin
 * @apiName svi_korisnici_admin
 * @apiGroup korisnici
 * @apiDescription Trazi login, ako korisnik ima admin ovlasti prikazuje sve korisnike 
  
    { 
    "email": "iz.iz@mail.com",
    "lozinka": "password123"
    } 

 * @apiVersion 0.0.1
 * @apiSuccessExample {json} Success:
 * {
  "success": true,
  "data": [
    {
      "id_kor": 1,
      "ime": "Izmjena",
      "prezime": "Izmjenić",
      "OIB": 2147483647,
      "email": "iz.iz@mail.com",
      "lozinka": "password123",
      "admin": 0
    },
    
  ],
  "message": "Prikaz svih korisnika"
}
*/
//* @apiSampleRequest off

    svi_korisnici_admin: function(req, res, next){
      try {
        let sql = `SELECT email, lozinka, admin FROM korisnici WHERE lozinka = "${req.body.lozinka}" AND email = "${req.body.email}"`;
        db.query(sql, (err, result) => {
              if (err) throw err;
              if (result.length == 0) {
                  res.json({ success: false, data: result, message: "Korisnički podatci nisu ispravni" });
              } else {
                let is_admin = result[0].admin;
                console.log(is_admin);
                if(is_admin == 0){
                  res.json({success: false, message: "Nemate admin ovlasti"});
                  
                }else{
                  let sql = 'SELECT * FROM korisnici';
            db.query(sql, (err, result) => {
              if (err) throw err;
              if (result.length == 0) {
                  res.json({ success: false, data: result, message: "Nema traženih podataka" });
              } else {
                res.json({ success: true, data: result, message: "Prikaz svih korisnika" });

                }});}}
              
          });
      } catch(err) {
          res.send(err);
      }
  },

/**
 * @api {post} /login login
 * @apiName login
 * @apiGroup korisnici
 * @apiDescription Trazi login, ako korisnik ima admin ovlasti prikazuje dostupne i nedostupne apartmane
 
   
     { 
    "email": "pero.perić@mail.com",
    "lozinka": "password123"
     }

 * @apiVersion 0.0.1
 * @apiBody {int} id (optional), {string} ime, {string} prezime, {date} datum_rodjenja, {string} pozicija, {int} id_kluba
 * @apiSuccessExample {json} Success:
 * {
  "success": true,
  "data": [
    {
      "Iznajmljeno_apartmana": 3,
      "Dostupno_apartmana": 18
    }
  ],
  "message": "Popis slobodnih i zauzetih apartmana"
}
*/
//* @apiSampleRequest off



//moje staro


  //   login: function(req, res, next){
  //     try {
  //       let loz = req.body.lozinka;
  //         let sql = `SELECT email, lozinka, admin FROM korisnici WHERE lozinka = "${req.body.lozinka}" AND email = "${req.body.email}"`;
  //         db.query(sql, (err, result) => {
  //             if (err) throw err;
  //             if (result.length == 0) {
  //                 res.json({ success: false, data: result, message: "Neispravni korisnički podatci" });
  //             } else {
  //               let is_admin = result[0].admin;
  //               console.log(is_admin);
  //               if(is_admin == 0){
  //                 res.json({success: false, message: "Nemate admin ovlasti"});
                  
  //               }else{
  //                 console.log("proslo");
  //                 let date_ob = new Date();
  //                 date_ob = date_ob.toISOString().slice(0, 19).replace('T', ' ');
  //                 date_ob = date_ob.slice(0,10);
  //     	          console.log(date_ob);
  //                 //date_ob = date_ob+"T22:00:00.000Z";
  //                 let sql_datum = `SELECT * FROM iznajmljivanje`
  //                // let sql2 = `SELECT * FROM iznajmljivanje WHERE datum_od BETWEEN '2022-04-27T22:00:00.000Z' AND '2025-04-23T22:00:00.000Z'`
  //                 // let sql2 = `SELECT (SELECT COUNT(*) FROM iznajmljivanje WHERE datum_od BETWEEN '1999-01-01' AND '${date_ob}' AND datum_do BETWEEN '${date_ob}' AND '3000-01-01') AS Iznajmljeno_apartmana,
  //                 //             (SELECT COUNT(*) FROM iznajmljivanje WHERE datum_od BETWEEN '0000-00-00' AND '${date_ob}' AND datum_do BETWEEN '0000-00-00' AND '${date_ob}') AS Dostupno_apartmana`
  //                 let sql2 = `SELECT (SELECT COUNT(*) FROM iznajmljivanje WHERE '${date_ob}' BETWEEN datum_od AND datum_do) AS Iznajmljeno_apartmana,
  //                 (SELECT COUNT(*) FROM iznajmljivanje WHERE '${date_ob}' NOT BETWEEN datum_od AND datum_do) AS Dostupno_apartmana`
  //                 console.log(sql2);

  //                 db.query(sql2, (err, result) => {
  //                   if (err) throw err;
  //                   if (result.length == 0) {
  //                       res.json({ success: false, data: result, message: "Neispravni korisnički podatci" });
  //                   } else {
  //                     let ukupno = result[0];
  //                     console.log(result.rows);
  //                     //let result1 = Object.values(JSON.parse(JSON.stringify(rows)));
  //                     //result.forEach((v) => console.log(v));
  //                     res.json({ success: true, data: result, message: "Popis slobodnih i zauzetih apartmana"});

  //                   }
  //                 });

  //               }
                  
  //             }
  //         });
  //     } catch(err) {
  //         res.send(err);
  //     }
  // },




//druga verzija




  // login: function(req, res, next) {
  //   try {
  //     let sql = `SELECT email, lozinka, admin FROM korisnici WHERE lozinka = "${req.body.lozinka}" AND email = "${req.body.email}"`;
  //     db.query(sql, (err, result) => {
  //       if (err) throw err;
  //       if (result.length == 0) {
  //         res.json({ success: false, data: result, message: "Neispravni korisnički podatci" });
  //       } else {
  //         let is_admin = result[0].admin;
  //         if (is_admin == 0) {
  //           res.json({ success: false, message: "Nemate admin ovlasti" });
  //         } else {
  //           let date_ob = new Date().toISOString().slice(0, 10);
  //           let sql2 = `SELECT (SELECT COUNT(*) FROM iznajmljivanje WHERE '${date_ob}' BETWEEN datum_od AND datum_do) AS Iznajmljeno_apartmana,
  //                       (SELECT COUNT(*) FROM iznajmljivanje WHERE '${date_ob}' NOT BETWEEN datum_od AND datum_do) AS Dostupno_apartmana`;
  //           db.query(sql2, (err, result) => {
  //             if (err) throw err;
  //             if (result.length == 0) {
  //               res.json({ success: false, data: result, message: "Neispravni korisnički podatci" });
  //             } else {
  //               res.json({ success: true, data: result, message: "Popis slobodnih i zauzetih apartmana" });
  //             }
  //           });
  //         }
  //       }
  //     });
  //   } catch (err) {
  //     res.send(err);
  //   }
  // },
  

  //ver_2.0

  login: function(req, res, next) {
    try {
      let sql = `SELECT email, lozinka, admin FROM korisnici WHERE lozinka = ? AND email = ?`;
      db.query(sql, [req.body.lozinka, req.body.email], (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
          res.json({ success: false, data: result, message: "Neispravni korisnički podatci" });
        } else {
          let is_admin = result[0].admin;
          if (is_admin == 0) {
            res.json({ success: false, message: "Nemate admin ovlasti" });
          } else {
            let date_ob = new Date().toISOString().slice(0, 10);
            let sql2 = `SELECT (SELECT COUNT(*) FROM iznajmljivanje WHERE ? BETWEEN datum_od AND datum_do) AS Iznajmljeno_apartmana,
                        (SELECT COUNT(*) FROM iznajmljivanje WHERE ? NOT BETWEEN datum_od AND datum_do) AS Dostupno_apartmana`;
            db.query(sql2, [date_ob, date_ob], (err, result) => {
              if (err) throw err;
              if (result.length == 0) {
                res.json({ success: false, data: result, message: "Neispravni korisnički podatci" });
              } else {
                res.json({ success: true, data: result, message: "Popis slobodnih i zauzetih apartmana" });
              }
            });
          }
        }
      });
    } catch (err) {
      res.send(err);
    }
  },
  


  /**
 * @api {post} /dodajuredikorisnika dodajuredikorisnika
 * @apiName dodaj_uredi_korisnika
 * @apiGroup korisnici
 * @apiDescription Omogućuje uređivanje i dodavanje korisnika
 
    {
      "id_kor": "553125",
      "ime": "Kanye",
      "prezime": "West",
      "OIB": 2147483647,
      "email": "f.f@mail.com",
      "lozinka": "sifric",
      "admin": 0
    }
 * @apiVersion 0.0.1
 * @apiBody {int} id_kor (optional) Stavlja se ako se želi urediti postojeći korisnik
 * @apiBody {string} ime 
 * @apiBody {string} prezime
 * @apiBody {int} OIB  11 znakova
 * @apiBody {string} email
 * @apiBody {string} lozinka
 * @apiBody {int} admin   0 ili 1
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

  dodaj_uredi_korisnika : function(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      return res.json({ success: false, message: "Nedovoljni podatci" });
    }

    
    let { id_kor, ime, prezime, OIB, email, lozinka, admin} = req.body;

    //let sql = `INSERT INTO korisnici SET ???????`;
   // let sql = `INSERT INTO korisnici (id_kor, ime, prezime, OIB, email, lozinka, admin) VALUES (?, ? , ?, ?, ?, ?, ?)`
    let sql = `REPLACE INTO korisnici (id_kor, ime, prezime, OIB, email, lozinka, admin) VALUES (?, ? , ?, ?, ?, ?, ?)`

    console.log(req.body);
    console.log(sql);

    db.query(sql, [id_kor, ime, prezime, OIB, email, lozinka, admin], (err, result) => {
    if (err) {
    return res.json({ success: false, message: err.message });
    }
    else {
    res.json({ success: true, data: result, message: "Uspješno" }); }

    });
    },




























  

    /**
 * @api {post}  /addigrac addigrac
 * @apiName addIgrac
 * @apiDefine SQL unos
 * unosi se ime,prezime,datum_rodjenja, pozicija, id_kluba
 * @apiGroup users
 * @apiVersion 0.0.1
 * @apiBody {int} id (optional), {string} ime, {string} prezime, {date} datum_rodjenja, {string} pozicija, {int} id_kluba
 * @apiSuccessExample {json} Success:
 * {
  "success": true,
  "data": {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 34,
    "serverStatus": 2,
    "warningCount": 0,
    "message": "",
    "protocol41": true,
    "changedRows": 0
  },
  "message": "Uspješno",
  "post": [
    {
      "ime": "Goran",
      "Prezime": "Bare",
      "datum_rodjenja": "1990-01-01",
      "pozicija": "Odbrambeni",
      "id_kluba": "3"
    }
  ]
}
*/
//* @apiSampleRequest off

//valja
    dodaj_uredi_korisnika1 : function(req, res, next) {
        if (Object.keys(req.body).length === 0) {
          return res.json({ success: false, message: "Nedovoljni podatci" });
        }

    
        let sql = `INSERT INTO korisnici SET ?`;
        console.log(req.body);
        console.log(sql);
  // db.query(sql, req.body, (err, result) => {
  //   if (err) {
  //     return res.json({ success: false, message: err.message });
  //   }
  //   else {
  //   res.json({ success: true, data: result, message: "Uspješno" }); }
    
  // });

  db.query(sql, req.body, (err, result) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }
    else {
    res.json({ success: true, data: result, message: "Uspješno" }); }
    
  });
      },

      

      dodaj_uredi_korisnika_body: function(req, res, next) {
        if (Object.keys(req.body).length === 0) {
          return res.json({ success: false, message: "No data provided" });
        }
    
        let sql = `INSERT INTO korisnici SET ?`;
        console.log(req.body);
        console.log(sql);
        db.query(sql, req.body, (err, result) => {
            if (err) {
                return res.json({ success: false, message: err.message });
            }
            res.json({ success: true, data: result, message: "Uspješno" });
        });
    }

}

module.exports = korisnici;