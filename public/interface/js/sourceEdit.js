var connected=false;                                
let textarea = document.getElementById('textarea'); 
let submitbutton = document.getElementById('submit')
let uri = window.location.pathname.slice(0, -8); //enlever ::source 
uri = decodeURI(uri);

let title = document.getElementById('title');
title.innerHTML = "<a href='"+ uri +"' >" + uri + "</a>" 



fetch(uri, {     //on recupère le code de la page à modifier
  method: 'get',
  headers: {
   'Accept': 'text/plain, */*',
   'Content-Type': 'text/html'
  },
 }).then((response) => {
         console.log("zut?? "+response);
        return response.text();
  }).then((data) => {
      console.log(data);
     textarea.value = data;

  });




var body =  document.body; //access DOM root pour ajouter button & textarea dynamiqualy (pour le moment pas utilisé)


textarea.oninput = glup;    
function glup (e){
   console.log("truc " + textarea.value);
   textarea.innerHTML = textarea.value;

  console.log("ta.value "+textarea.value);
  console.log("ta.innerText "+textarea.innerText);
  console.log("ta.textContent "+textarea.textContent);

  console.log("ta.innerHTML "+textarea.innerHTML);

  fetch(uri, {                                  //ça ça permet d'envoyer la page modifiée au serveur pour qu'il la sauvegarde
      method: 'post',
      headers: {
       'Accept': 'application/json, text/plain, */*',
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({html:textarea.textContent}) //on stock dans le body de la requete serveur tout le code de la page html
     }).then((response) => {
      textarea.style.backgroundColor = "rgb(255, 130, 130)"; //textarea devient rouge
        return response.json();
      }).then((data) => {
          console.log(data.state);
          if(data.state=="saved"){    //le serveur répond que c'est OK
           
            textarea.style.background = "white";
            textarea.style.transition = "0.3s"; //on repasse la textarea en blanc


          }
      });

}







 


