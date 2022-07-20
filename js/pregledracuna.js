$(document).ready(function(){
  PopunjavanjeRacuna();

})

var CurrentId='';

// PopunjavanjeRacuna() - funkcija za popunjavanje tablice

function PopunjavanjeRacuna()
{
  pRacuni.on('value', function(oOdgovorPosluzitelja){
    var nBrojacRacuna = 1;
    var ispis = $('#table_body');
    var klasa='"row"';
    SviRacuni.forEach(function(racun){
      
      var row = '<tr><th scope= ' + klasa + '>' + nBrojacRacuna + '</th><td>' + racun.DatumIzdavanja + '</td><td>' + racun.KolicinaGoriva + '</td><td>' + racun.TipGoriva + '</td><td>' + racun.UkupnaCijena + ' kn' + '</td><td><button class="btn btn-danger fas fa-minus-circle" onclick="Storniraj('+"'"+racun.IdRacuna+"'"+')"></button></td><tr>' ;
      nBrojacRacuna++;
      ispis.append(row);
    });
  });

  
}


function Storniraj(UserId)
{
  CurrentId=UserId;

  var oldRef = p.ref('racuni/' + UserId);
  oldRef.once('value', gotData);
  function gotData(data) 
  {
   
    const racun = data.val();
    for(const item in racun)
    {
    
     var datum1 = racun.datum_izdavanja;
     var kolicina1 =  racun.kolicina_goriva;
     var tip1 =  racun.tip_goriva;
     var cijena1 = racun.ukupna_cijena;
    }

    var datum = datum1;
    var kolicina = kolicina1;
    var tip = tip1;
    var cijena = cijena1


    pStornirani.once('value', function(){

  
    pStornirani.child(UserId).set({
    datum_izdavanja: datum,
    tip_goriva: tip,
    kolicina_goriva: kolicina,
    ukupna_cijena: cijena
  });
   
});
  var r = confirm('Jeste li sigurni?');
  if(r==true) 
  {
    if(tip = "Benzin") 
    {
     pBenzin.once('value', function(){
    SvaBenzin.forEach(function(benzin){
      var benzinKolicina = parseInt(benzin.Kolicina);
      var kolicinaStornirano = parseInt(kolicina);
      const novaKolicina = {
        kolicina: benzinKolicina + kolicinaStornirano
      };
    
    pBenzin.child('0').update(novaKolicina);
              
    });
    });
   }
 
  
  
   if(tip = "Dizel") 
    {
     pDizel.once('value', function(){
    SvaDizel.forEach(function(dizel){
      var dizelKolicina = parseInt(dizel.Kolicina);
      var kolicinaStornirano = parseInt(kolicina);
      const novaKolicina = {
        kolicina: dizelKolicina + kolicinaStornirano
      };
    
    pDizel.child('0').update(novaKolicina);
            
    });

  });
    }
  }
  else {
    setTimeout("location.href = 'pregledracuna.html';", 1)
  }

    pRacuni.child(UserId).remove();
    setTimeout("location.href = 'pregledracuna.html';", 1)
   
   


}
}




//jquery live pretraga

$(document).ready(function(){

  // Search all columns
  $('#searchbar').keyup(function(){
    // Search Text
    var search = $(this).val();

    // Hide all table tbody rows
    $('table tbody tr').hide();

    // Count total search result
    var len = $('table tbody tr:not(.notfound) td:contains("'+search+'")').length;

    if(len > 0){
      // Searching text in columns and show match row
      $('table tbody tr:not(.notfound) td:contains("'+search+'")').each(function(){
        $(this).closest('tr').show();
      });
    }else{
      $('.notfound').show();
    }

  });
});

//case insensitive
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
   return function( elem ) {
     return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
   };
});
