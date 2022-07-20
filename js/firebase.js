  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDiHZa2h2taCbkNT3G6Jy5zzJWONE2DNjE",
    authDomain: "benzinska-crpka-pin-2.firebaseapp.com",
    databaseURL: "https://benzinska-crpka-pin-2-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "benzinska-crpka-pin-2",
    storageBucket: "benzinska-crpka-pin-2.appspot.com",
    messagingSenderId: "789520443877",
    appId: "1:789520443877:web:d6582b81675a664fd3670c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var p = firebase.database();
  var pRacuni = p.ref('racuni');
  var pUpiti = p.ref('upiti');
  var pBenzin = p.ref('benzin');
  var pDizel = p.ref('diesel');
  var pStornirani = p.ref('storniraniracuni');

  var SviRacuni = [];
  var SviUpiti = [];
  var SvaBenzin = [];
  var SvaDizel = [];
  var SviStornirani = [];

  $(document).ready(function(){
    DohvacanjeRacuna();
    DohvacanjeUpita();
    DohvacanjeBenzina();
    DohvacanjeDizela();
    DohvacanjeStorniranih();
  });

  function DohvacanjeRacuna()
  {
    var Id= '';
    pRacuni.on('value', function(oOdgovorPosluzitelja){
      oOdgovorPosluzitelja.forEach(function(oRacuniSnapshot){
        var oRacuni = oRacuniSnapshot.val();
        Id = oRacuniSnapshot.key;
        const racun = new Racun(Id,oRacuni.datum_izdavanja, oRacuni.kolicina_goriva,oRacuni.ukupna_cijena, oRacuni.tip_goriva);
        SviRacuni.push(racun);
        
      });
    });
  }

  function DohvacanjeStorniranih()
  {
    var Id= '';
    pStornirani.on('value', function(oOdgovorPosluzitelja){
      oOdgovorPosluzitelja.forEach(function(oStorniraniSnapshot){
        var oStornirani = oStorniraniSnapshot.val();
        Id = oStorniraniSnapshot.key;
        const storniran = new Racun(Id,oStornirani.datum_izdavanja, oStornirani.kolicina_goriva,oStornirani.ukupna_cijena, oStornirani.tip_goriva);
        SviRacuni.push(storniran);
        
      });
    });
  }

  function DohvacanjeUpita()
  {
    var Id = '';
    pUpiti.on('value', function(oOdgovorPosluzitelja){
      oOdgovorPosluzitelja.forEach(function(oUpitiSnapshot){
        var oUpiti = oUpitiSnapshot.val();
        Id = oUpitiSnapshot.key;
        const upit = new Upit(Id, oUpiti.Broj, oUpiti.Email, oUpiti.Ime, oUpiti.Poruka, oUpiti.Tvrtka);
        SviUpiti.push(upit);
      });
    });
  }

  function DohvacanjeBenzina()
  {
    pBenzin.on('value', function(oOdgovorPosluzitelja){
      oOdgovorPosluzitelja.forEach(function(oBenzinSnapshot){
        var oBenzin = oBenzinSnapshot.val();
        const benzin = new Gorivo(oBenzin.cijena, oBenzin.gorivo, oBenzin.kolicina);
        SvaBenzin.push(benzin);

      
      });
    });
  }
//
  function DohvacanjeDizela()
  {
    pDizel.on('value', function(oOdgovorPosluzitelja){
      oOdgovorPosluzitelja.forEach(function(oDizelSnapShot){
        var oDizel = oDizelSnapShot.val();
        const dizel = new Gorivo(oDizel.cijena, oDizel.gorivo,oDizel.kolicina);
        SvaDizel.push(dizel);
        
      });
    });
  }

  class Racun {
    constructor(IdRacuna, DatumIzdavanja, KolicinaGoriva, UkupnaCijena, TipGoriva) {
      this.IdRacuna = IdRacuna;
      this.DatumIzdavanja = DatumIzdavanja;
      this.KolicinaGoriva = KolicinaGoriva;
      this.UkupnaCijena = UkupnaCijena;
      this.TipGoriva = TipGoriva;
    }
  }

  class Upit
  {
    constructor(IdUpita, BrojMobitela, Email, Ime, Poruka, Tvrtka) {
      this.IdUpita = IdUpita;
      this.BrojMobitela = BrojMobitela;
      this.Email = Email;
      this.Ime = Ime;
      this.Poruka = Poruka;
      this.Tvrtka = Tvrtka;
    }
  }

  class Gorivo
  {
    constructor(Cijena, Gorivo, Kolicina)
    {
      this.Cijena = Cijena;
      this.Gorivo = Gorivo;
      this.Kolicina = Kolicina;
    }
  }