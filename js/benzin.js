$(document).ready(function() {
  IspisKolicine();
  DatepickerFunkcija();

});


function DatepickerFunkcija()
{


	$('#odabirDatuma').datetimepicker({
		locale:'hr',
		format:'DD/MM/YYYY HH:mm',
		daysOfWeekDisabled: [0,6],
	});
}






const input = document.getElementById('kolicina');
const log = document.getElementById('ukupna-cijena');

// updateCijenu() - automatsko izračunavanje ukupne cijene -------------------------------------------------
// IspisKolicine() - info o kolicini goriva u spremniku ---------------------------------------------------- 

input.addEventListener('input', updateCijenu);

function updateCijenu(e) {
	pBenzin.once('value', function(){

		SvaBenzin.forEach(function(benzin){


  log.textContent = (e.target.value * benzin.Cijena).toFixed(2) + " kn";
  	});
  });
}

function IspisKolicine()
{
	pBenzin.once('value', function(){

		var ispis=$('#alert-info');
	
		SvaBenzin.forEach(function(benzin){
			var tekst = 'Na raspolaganju je ' + (benzin.Kolicina).toFixed(2) + ' litara benzina!';
			ispis.append(tekst);
		
		});

	});
}

//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------


// IzdajRacun() - dohvaćanje podataka, provjera unosa, izdavanje računa, ažuriranje spremnika ------------
function IzdajRacun()
{
	


const Datum = document.getElementById('odabirDatuma');
const Kolicina = document.getElementById('kolicina');
const KolicinaValue = parseFloat(Kolicina.value).toFixed(2);
const autoId = pRacuni.push().key;
var TipGoriva = 'Benzin';



var Tocno = true;
/*if(KolicinaValue == '')
{
	alert('Kolicina mora sadrzavati neku vrijednost!');
	Tocno = false;
	setTimeout("location.href = 'benzin.html';", 1);
} */

 if (KolicinaValue < 5) {
	alert('Kolicina ne smije biti manja od 5!');
	Tocno = false;
	setTimeout("location.href = 'benzin.html';", 1)

}


pBenzin.once('value', function(){
	
		SvaBenzin.forEach(function(benzin){
			if(KolicinaValue > benzin.Kolicina) {
				alert('Kolicina ne smije biti veća od maksimalne');
				Tocno = false;
				setTimeout("location.href = 'benzin.html';",1)
			}

			
		
		});

	});





if(Tocno) {
	var r = confirm("Jeste li sigurni?");
 	if(r==true) {
	pBenzin.once('value', function(){
	SvaBenzin.forEach(function(benzin){
		
		var UkupnaCijena = Kolicina.value * benzin.Cijena;
	

	pRacuni.child(autoId).set({
		datum_izdavanja: Datum.value,
		tip_goriva: TipGoriva,
		kolicina_goriva: KolicinaValue,
		ukupna_cijena: (UkupnaCijena).toFixed(2)
	});
 });
});
	
	pBenzin.once('value', function(){
		SvaBenzin.forEach(function(benzin){
			const novaKolicina = {
				kolicina: benzin.Kolicina - KolicinaValue
			};
		
		pBenzin.child('0').update(novaKolicina);
		});

	});
	alert('Dodali ste račun');
	setTimeout("location.href = 'pregledracuna.html';", 500);
}
}

}

//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------



