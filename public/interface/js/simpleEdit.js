

import "/interface/js/marked.min.js";



var virtualDOM;
let interfaceDiv = document.getElementById('interface'); 
var content = document.getElementById('content');  //la zone centrale par defaut qui se remplie quand on ecrit dans la textarea


interfaceDiv.style.display ="none";

if(document.getElementById('hideTextArea')){
  let hideTextArea = document.getElementById('hideTextArea');
}else{
  interfaceDiv.innerHTML = "<div id='hideTextArea'> hide </div>" + interfaceDiv.innerHTML;
  let hideTextArea = document.getElementById('hideTextArea');
}

if(document.getElementById('textarea')){
  let textarea = document.getElementById('textarea');
}else{
  interfaceDiv.innerHTML = interfaceDiv.innerHTML + "<textarea id='textarea'></textarea>";
  let textarea = document.getElementById('textarea');
}

if(document.getElementById('toSource')){
  let toSource = document.getElementById('toSource');
  toSource.href = window.location.pathname + "::source";
}else{
  interfaceDiv.innerHTML = interfaceDiv.innerHTML +  "<a id='toSource'>::source</a>";
  let toSource = document.getElementById('toSource');
  toSource.href = window.location.pathname + "::source";
}


hideTextArea.addEventListener('click', function handleClick(event) {
  console.log(textarea.style.display);
  if(textarea.style.display=="none"){
    textarea.style.display="block";
    toSource.style.display="block"
    interfaceDiv.style.width = "600px";
    hideTextArea.innerHTML = "hide";
  }else{
    textarea.style.display="none";
    toSource.style.display="none"
    interfaceDiv.style.width = "50px";
    hideTextArea.innerHTML = "show";
  }
});





fetch('/connected', {             //check si on est connecté
  method: 'get',
  headers: {
   'Accept': 'application/json, text/plain, */*',
   'Content-Type': 'application/json'
  },
 }).then((response) => {
        return response.json();
  }).then((data) => {
      if(data.connected){          // on est bien connecté
        
        interfaceDiv.style.display="block";
        textarea.style.background = "white";

        fetch("", {     //on recupère le code source de la page pour faire un virtualDOM
           method: 'get',
           headers: {
           'Accept': 'text/plain, */*',
           'Content-Type': 'text/html'
          },
        }).then((response) => {
          console.log("zut?? "+response);
          return response.text();
        }).then((data) => {
          const parser = new DOMParser();
          virtualDOM = parser.parseFromString(data, 'text/html'); 
          var virtualInterface = virtualDOM.getElementById("interface"); 
          if (!virtualDOM.getElementById("textarea")){ //je comprends pas trop pourquoi il faut faire ça, mais ça répare un bug que j'avais (textarea en double)
            virtualInterface.innerHTML = virtualInterface.innerHTML + "<textarea id='textarea'>virtual textarea</textarea>";
          }
          });
        }else{
        console.log("PAS CONNECTÉ");
        interfaceDiv.remove();
        

      }
  });



textarea.oninput = glup;    //quand on modifie le contenu de la textarea on lance la fonction glup çi-dessous
function glup (e){
  textarea.innerHTML = textarea.value;
  content.innerHTML =  marked(textarea.value); //la fonction qui traduit le markdown de la textarea en html pour l'afficher dans #content
  virtualDOM.getElementById('content').innerHTML = content.innerHTML;
  virtualDOM.getElementById('interface').style.display = 'none';
  virtualDOM.getElementById('textarea').innerHTML = textarea.value; 
  var s = new XMLSerializer();
  var str = s.serializeToString(virtualDOM);
  fetch('', {                               
      method: 'post',
      headers: {
       'Accept': 'application/json, text/plain, */*',
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({html:str})
     }).then((response) => {
      textarea.style.backgroundColor = "rgb(255, 130, 130)";
        return response.json();
      }).then((data) => {
          console.log(data.state);
          if(data.state=="saved"){
           
            textarea.style.background = "white";
            textarea.style.transition = "0.3s";

          }
      });

}







 


