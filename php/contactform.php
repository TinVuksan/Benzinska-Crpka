<?php

if (isset($_POST['submit'])) {
	
	$ime = $_POST['ime'];
	$prezime = $_POST['prezime'];
	$mail = $_POST['email'];
	$naslov = $_POST['naslov'];
	$poruka = $_POST['poruka'];

	$mojMail = "tin.vuksan@vsmti.hr";
	$headers = "From: ".$mail;


	mail($mojMail, $naslov, $txt, $headers);
	header("Location: kontakt.html?mailsend");
} 



/*				<div class="form-group col-lg-4">
				
				<input id="ime" class="form-control" type="text" name="ime" placeholder="Ime">
			</div>

			<div class="form-group col-lg-4">
				
				<input id="prezime" class="form-control" type="text" name="prezime" placeholder="Prezime">
			</div>

			<div class="form-group col-lg-4">
			
				<input id="email" class="form-control" type="email" name="email" placeholder="Mail adresa">
			</div>
		
			<div class="form-group col-lg-12">
			
				<input id="email" class="form-control" type="text" name="naslov" placeholder="Naslov">
			</div>
		
			<div class="form-group col-lg-12">
				
				<textarea id="message" class="form-control" type="text"  rows="8" name="poruka" placeholder="Upiši poruku"></textarea>
			</div> 
*/

?>