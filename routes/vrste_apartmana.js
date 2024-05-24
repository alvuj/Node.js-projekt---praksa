const express = require('express');
const router = express.Router();
const db = require('../connections');
const mysql = require('mysql');

var vrste_apartmana = {
    /**
 * @api {post} /svelokacije svelokacije
 * @apiName svelokacije
 * @apiGroup lokacija
 * @apiVersion 0.0.1
 * @apiSuccessExample {json} Success:
 * {
  "success": true,
  "data": [
    {
      "id_lok": 1,
      "ime_lokacije": "Zagreb"
    },
    
  "message": "Uspješno"
}
*/
//* @apiSampleRequest off

    sve_vrste_apartmana: function(req, res, next){
        try {
            let sql = 'SELECT * FROM vrste_apartmana';
            db.query(sql, (err, result) => {
                if (err) throw err;
                if (result.length == 0) {
                    res.json({ success: false, data: result, message: "Nema lokacija" });
                } else {
                    res.json({success: true, data: result, message: "Uspješno"});
                }
            });
        } catch(err) {
            res.send(err);
        }
    },

   
}

module.exports = vrste_apartmana;