$(document).ready(function() {
  IspisKolicineBenzin();
  IspisKolicineDizel();
  SemaforBenzin();
  SemaforDizel();
});

//IspisKolicineBenzin(), IspisKolicineDizel() - info o trenutnom stanju spremnika -------------------
function IspisKolicineBenzin()
{
	pBenzin.once('value', function(){

		var ispis=$('#alert-benzin');
	
		SvaBenzin.forEach(function(benzin){
			var tekst = 'Na raspolaganju je ' + benzin.Kolicina + ' litara benzina!';
			ispis.append(tekst);
		
		});

	});
}

function IspisKolicineDizel()
{
	pDizel.once('value', function(){

		var ispis=$('#alert-dizel');
	
		SvaDizel.forEach(function(dizel){
			var tekst = 'Na raspolaganju je ' + dizel.Kolicina + ' litara dizela!';
			ispis.append(tekst);
		
		});

	});
}

//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------


//Azuriranje benzina --------------------------------------------------------------------------------

function AzurirajKolicinuBenzina() {
const Kolicina = document.getElementById('kolicina');
const KolicinaValue = Kolicina.value.trim();
var kolicina = parseInt(KolicinaValue);

var Tocno = true;
if(KolicinaValue ==='')
{
	alert('Morate unijeti neku vrijednost!');
	Tocno = false;
	setTimeout("location.href = 'stanjespremnika_benzin.html';", 1)
}

else if (KolicinaValue < 1000) {
	alert('Kolicina goriva ne smije biti manja od 1000 litara!');
	Tocno = false;
	setTimeout("location.href = 'stanjespremnika_benzin.html';", 1)
}
pBenzin.once('value', function(){
	
		SvaBenzin.forEach(function(benzin){
			var benzinKolicina = parseInt(benzin.Kolicina);
			if((kolicina + benzinKolicina) > 20000) 
			{
				alert('U spremniku može biti maksimalno 20000 litara goriva!');
				Tocno = false;
				setTimeout("location.href = 'stanjespremnika_benzin.html';", 1);
			}

			
		
		});

	});

if(Tocno) 
	{
	pBenzin.once('value', function(){
		SvaBenzin.forEach(function(benzin){
			var benzinKolicina = parseInt(benzin.Kolicina);
			const novaKolicina = {
				kolicina: benzinKolicina + kolicina
			};
			pBenzin.child('0').update(novaKolicina);
		});
	});
	alert('Azurirali ste stanje spremnika!');

	}
}


//Azuriranje dizela --------------------------------------------------------------------------------

function AzurirajKolicinuDizela() {
const Kolicina = document.getElementById('kolicina');
const KolicinaValue = Kolicina.value.trim();
var kolicina = parseInt(KolicinaValue);

var Tocno = true;
if(KolicinaValue ==='')
{
	alert('Morate unijeti neku vrijednost!');
	Tocno = false;
	setTimeout("location.href = 'stanjespremnika_dizel.html';", 1)
}

else if (KolicinaValue < 1000) {
	alert('Kolicina goriva ne smije biti manja od 1000 litara!');
	Tocno = false;
	setTimeout("location.href = 'stanjespremnika_dizel.html';", 1)
}
pDizel.once('value', function(){
	
		SvaDizel.forEach(function(dizel){
			var dizelKolicina = parseInt(dizel.Kolicina);
			if((kolicina + dizelKolicina) > 20000) 
			{
				alert('U spremniku može biti maksimalno 20000 litara goriva!');
				Tocno = false;
				setTimeout("location.href = 'stanjespremnika_dizel.html';", 1);
			}

			
		
		});

	});

if(Tocno) 
	{
	pDizel.once('value', function(){
		SvaDizel.forEach(function(dizel){
			var dizelKolicina = parseInt(dizel.Kolicina);
			const novaKolicina = {
				kolicina: dizelKolicina + kolicina
			};
			pDizel.child('0').update(novaKolicina);
		});
	});
	alert('Azurirali ste stanje spremnika!');

	}
}

//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------

//SemaforBenzin(), SemaforDizel() - informacije o trenutnoj cijeni goriva ---------------------------

function SemaforBenzin()
{
	pBenzin.once('value', function(){

		var ispis = $('#semaforbenzin');
	
		SvaBenzin.forEach(function(benzin){
			var tekst = 'Benzin - ' + benzin.Cijena + 'kn/L';
			ispis.append(tekst);
		
		});

	});
}

function SemaforDizel()
{
	pDizel.once('value', function(){

		var ispis = $('#semafordizel');
	
		SvaDizel.forEach(function(dizel){
			var tekst = 'Dizel - ' + dizel.Cijena + 'kn/L';
			ispis.append(tekst);
		
		});

	});
}

//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------