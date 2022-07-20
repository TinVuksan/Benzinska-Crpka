$(document).ready(function() {
  IspisKolicine();
  DatepickerFunkcija();
});


function DatepickerFunkcija()
{
	var date = new Date();
	var today = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());

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

function IspisKolicine()
{
	pDizel.once('value', function(){

		var ispis=$('#alert-info');
	
		SvaDizel.forEach(function(dizel){
			var tekst = 'Na raspolaganju je ' + (dizel.Kolicina).toFixed(2) + ' litara dizela!';
			ispis.append(tekst);
		
		});

	});
}

function updateCijenu(e) {
  log.textContent = (e.target.value * 8.78).toFixed(2) + " kn";

}

//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------


// IzdajRacun() - dohvaćanje podataka, provjera unosa, izdavanje računa, ažuriranje spremnika ------------

function IzdajRacun()
{
	


const Datum = document.getElementById('odabirDatuma');
const Kolicina = document.getElementById('kolicina');
var KolicinaValue = parseFloat(Kolicina.value).toFixed(2);
const autoId = pRacuni.push().key;
var TipGoriva = 'Diesel';
var UkupnaCijena = Kolicina.value * 8.78;
var Tocno = true;
if(KolicinaValue === '')
{
	alert('Kolicina mora sadrzavati neku vrijednost!');
	Tocno = false;
	setTimeout("location.href = 'diesel.html';", 1)
} 

else if (KolicinaValue < 5) {
	alert('Kolicina ne smije biti manja od 5!');
	Tocno = false;
	setTimeout("location.href = 'diesel.html';", 1)

}
pDizel.once('value', function(){
	
		SvaDizel.forEach(function(dizel){
			if(KolicinaValue > dizel.Kolicina) {
				alert('Kolicina ne smije biti veća od maksimalne');
				Tocno = false;
				setTimeout("location.href = 'diesel.html';",1)
}
		
		});

	});



if(Tocno) {
	var r = confirm("Jeste li sigurni?");
 	if(r==true) {
	pRacuni.child(autoId).set({
		datum_izdavanja: Datum.value,
		tip_goriva: TipGoriva,
		kolicina_goriva: KolicinaValue,
		ukupna_cijena: (UkupnaCijena).toFixed(2)
	});
	
	pDizel.once('value', function(){
		SvaDizel.forEach(function(dizel){
			const novaKolicina = {
				kolicina: dizel.Kolicina - KolicinaValue
			};
			
		pDizel.child('0').update(novaKolicina);
		});

	});
	alert('Dodali ste račun');
	setTimeout("location.href = 'pregledracuna.html';", 500);
				}
			}

}

//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------