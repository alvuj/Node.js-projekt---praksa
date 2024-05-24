var express 		= require('express');
var router 			= express.Router();

var apartmani        = require('./apartmani.js');
var lokacija       = require('./lokacija.js');
var korisnici        = require('./korisnici.js');
var vrste_apartmana        = require('./vrste_apartmana.js');
var iznajmljivanje      = require('./iznajmljivanje.js');

//apartmani.js
router.post('/api/sviapartmani', apartmani.svi_apartmani);
router.post('/api/dodajurediapartman', apartmani.dodaj_uredi_apartman);
router.post('/api/deleteapartman', apartmani.delete_apartman);


//korisnici.js
router.post('/api/login', korisnici.login);
router.post('/api/svikorisnici', korisnici.svi_korisnici);
router.post('/api/dodajuredikorisnika', korisnici.dodaj_uredi_korisnika);
router.post('/api/svikorisniciadmin', korisnici.svi_korisnici_admin);

//lokacija.js
router.post('/api/svelokacije', lokacija.sve_lokacije);
 
//vrste_apartmana.js
router.post('/api/svevrsteapartmana', vrste_apartmana.sve_vrste_apartmana);

//iznajmljivanje.js
router.post('/api/svaiznajmljivanja', iznajmljivanje.sva_iznajmljivanja);
router.post('/api/dodajurediiznajmljivanje', iznajmljivanje.dodaj_uredi_iznajmljivanje);
router.post('/api/deleteiznajmljivanje', iznajmljivanje.delete_iznajmljivanje);








//provjere
router.post('/api/dodajuredikorisnikabody', korisnici.dodaj_uredi_korisnika_body);
router.post('/api/dodajapartman1', apartmani.dodaj_apartman1);
router.post('/api/dodajapartman1', apartmani.dodaj_apartman2);
        

module.exports = router;