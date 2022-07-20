$(document).ready(function() {
  IspisCijene();

});


function IspisCijene()
{
	pDizel.once('value', function(){

		var ispis=$('#alert-info');
	
		SvaDizel.forEach(function(dizel){
			
			var tekst = 'Trenutna cijena dizela je ' + dizel.Cijena;
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
	setTimeout("location.href = 'azurirajdiesel.html';", 1);
	}
	else if(cijenaValue > 14)
	{
	alert('Cijena ne smije biti veća od 14 kuna!');
	Tocno = false;
	setTimeout("location.href = 'azurirajdiesel.html';", 1);
	}
	
	if(Tocno) 
 {
 	var r = confirm("Jeste li sigurni?");
 	if(r==true) {
	pDizel.once('value', function(){
		SvaDizel.forEach(function(dizel){
			const novaCijena = {
				cijena: cijena.value
			};
			
		pDizel.child('0').update(novaCijena);
		});

	});
	setTimeout("location.href = 'azurirajdiesel.html';", 1);
	}
 }

 


}