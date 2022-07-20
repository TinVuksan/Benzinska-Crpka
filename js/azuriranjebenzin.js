$(document).ready(function() {
  IspisCijene();

});


function IspisCijene()
{
	pBenzin.once('value', function(){

		var ispis=$('#alert-info');
	
		SvaBenzin.forEach(function(benzin){
			var tekst = 'Trenutna cijena benzina je ' + benzin.Cijena;
			ispis.append(tekst);
		
		});

	});
}

function AzurirajCijenu() 
{
	const cijena = document.getElementById('cijena');
	const cijenaValue = cijena.value.trim();
	var Tocno = true;

	if(cijenaValue < 2) 
	{
	alert('Cijena mora biti veća od 2 kune!');
	Tocno = false;
	setTimeout("location.href = 'azurirajbenzin.html';", 1)
	}
	else if(cijenaValue > 14)
	{
	alert('Cijena ne smije biti veća od 14 kuna!');
	Tocno = false;
	setTimeout("location.href = 'azurirajbenzin.html';", 1)
	}
	if(Tocno) 
  {
 	var r = confirm("Jeste li sigurni?");
 	if(r==true) {
	pBenzin.once('value', function(){
		SvaBenzin.forEach(function(benzin){
			const novaCijena = {
				cijena: cijena.value
			};
			
		pBenzin.child('0').update(novaCijena);
		});

	});

	setTimeout("location.href = 'azurirajbenzin.html';", 1);
	}
  }
}