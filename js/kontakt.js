const database=firebase.database();


//Gdje se spremaju upiti
let contactInfo = database.ref('upiti')

//Event listener za submit
document.querySelector("#kontaktirajte_nas").addEventListener("submit", submitForm);

function submitForm(e)
{
	e.preventDefault();

//Dohvaćanje sadržaja inputa
	let ime = document.querySelector("#ime").value;
	let prezime = document.querySelector("#prezime").value;
	let email = document.querySelector("#email").value;
	let naslov = document.querySelector("#naslov").value;
	let poruka = document.querySelector("#poruka").value;
	var match_ime = ime.match(/\d+/g);
	var match_prezime = prezime.match(/\d+/g);
	var tocno = true;
	if(match_ime != null || match_prezime != null) 
	{
		alert('Ime i prezime ne može sadržavati broj!')
		tocno = false;
	}

	else {
	alert('Upit poslan!')
	saveContactInfo(ime,prezime,email,naslov,poruka);
	}
}


function saveContactInfo(ime,prezime,email,naslov,poruka)
{
	let newContactInfo = contactInfo.push();

	newContactInfo.set(
	{
		Ime: ime,
		Prezime:prezime,
		Email: email,
		Naslov: naslov,
		Poruka: poruka
	})
}