

function userlogin(){
    var useremail=document.getElementById("email").value;
    var userpassword=document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(useremail, userpassword).catch(function(error){
        var errorCode=error.code;
        var errorMessage=error.message;
        window.alert("Unijeli ste pogrešne podatke!");        
    });

  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // Korisnik je ulogiran
   window.location.href="index.html";
  }
   else {
    // Nitko nije ulogiran  
   }
});
}
// UserLogout - funkcija za odjavu
function UserLogout(){
    firebase.auth().signOut();
    firebase.auth().onAuthStateChanged(function(user){
      if(user)
      {
        
      }
      else
      {
        window.location.href="login.html";
      }
    })
}
//Resetiranje lozinke
$('#ZaboravljenaLozinka').click(function(){
  var auth = firebase.auth();
  var email = $('#email').val();
  if (email != '') {
    auth.sendPasswordResetEmail(email).then(function(){
      
      window.alert('Poslali smo poruku za resetiranje na Vašu email adresu!');
    })
    .catch(function(error){
      var errorMessage = error.message;

      window.alert('Greška: '+ errorMessage);
    });
  }else{
    window.alert('Molimo unesite prvo email.');
  }

}); 