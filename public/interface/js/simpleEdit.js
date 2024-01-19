/*


Resumer à quoi sert ce code

Il s'occupe de plusieurs choses :

1. Il sert à mettre en place les éléments d'interface... (les boutons, la textarea, les scripts...)
Ce qu'il faut bien comprendre c'est que ces éléments d'interface font parti du "contenu" de la page :
La divInterface, les boutons, la textarea et tout son contenu sont sauvegardés directement dans le fichier html des pages.
Par defaut ils sont invisibles ("virtualDOM.getElementById('interface').style.display = 'none';" dans la fonction "Glup");
On ne les fait apparaitre que quand on est connecté ("interfaceDiv.style.display="block";" après le fetch /connected).

OK en fait je me suis planté : actuellement il n'y a que la "div interface" et la textarea (et son contenu) qui sont sauvegardées, et les boutons etc sont générés à chaque fois, en soit c'est pas trop mal.


2. 


il gère aussi un truc de virtualDom, faut que je retourne dans mes notes pour bien comprendre

https://arthur.cahut.net/dev/J/11-08-23






*/







import "/interface/js/marked.min.js";



var virtualDOM;
var interfaceDiv = document.getElementById('interface'); 
var content = document.getElementById('content');  //la zone centrale par defaut qui se remplie quand on ecrit dans la textarea
var hideTextArea;
var interfaceDiv2;
var textarea;
var toSource;
var toModele;
var moveTextArea;

var unresolvedPosts = 0;

interfaceDiv.style.display ="none";







fetch('/connected', {             //check si on est connecté
  method: 'get',
  headers: {
   'Accept': 'application/json, text/plain',
   'Content-Type': 'application/json'
  },
 }).then((response) => {
        return response.json();
  }).then((data) => {
      if(data.connected){          // on est bien connecté

        
        if(document.getElementById("textarea")){
          textarea = document.getElementById("textarea"); //si la textarea existe déjà, on la sauvegarde dans une variable JS (elle contient des infos importantes (le markdown))
        }
        else{
           textarea = document.createElement("textarea");
           textarea.id = "textarea";
        }
        interfaceDiv.innerHTML = "";                   //on efface tout, pour être sûr de bien générer les elements d'interface, solution la plus simple que j'ai trouvé pour gerer tout les cas de figure (par exemple des interfaces de vieilles pages cahut)
        interfaceDiv.innerHTML = "<div id='hideTextArea'>hide</div>";
        interfaceDiv.innerHTML = interfaceDiv.innerHTML + "<div id='moveTextArea'>move</div>";
        interfaceDiv.innerHTML = interfaceDiv.innerHTML + " <div id='interface2'></div>";
        interfaceDiv2 = document.getElementById('interface2');
        interfaceDiv2.innerHTML = textarea.outerHTML; 

        interfaceDiv2.innerHTML = interfaceDiv2.innerHTML + "<a class='interfacelink' id='toModele'> modele </a>";
        toModele = document.getElementById('toModele');
        toModele.href = window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/")) + "/modele";

        interfaceDiv2.innerHTML = interfaceDiv2.innerHTML + "<a class='interfacelink' id='toSource'> ::source </a>";
        toSource = document.getElementById('toSource');
        toSource.href = window.location.pathname + "::source";

       /* interfaceDiv2.innerHTML = interfaceDiv2.innerHTML + "<a id='toFolder'> Dossier </a> ";
        toFolder = document.getElementById('toFolder');
        toFolder.href = "/public/pages" + window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/")) + "/";*/
        
        textarea = document.getElementById("textarea");
        moveTextArea = document.getElementById('moveTextArea');
        hideTextArea = document.getElementById('hideTextArea');
        hideTextArea.addEventListener('click', function handleClick(event) {
          console.log("LALLAL");
          if(interfaceDiv2.style.display=="none"){
            hideTextArea.innerHTML = "hide";
            interfaceDiv2.style.display="block";
            interfaceDiv.style.width=500+"px";
            interfaceDiv.style.height=600 + "px";

          }else{ 
            hideTextArea.innerHTML = "show";
            interfaceDiv2.style.display="none";
            interfaceDiv.style.width= 120+"px";
            interfaceDiv.style.height=30 + "px";


          }
        });
        dragElement(interfaceDiv);

          function dragElement(elmnt) {
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            moveTextArea.onmousedown = dragMouseDown;
  

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}



        
        textarea.oninput = glup;    //quand on modifie le contenu de la textarea on lance la fonction glup çi-dessous
        
        interfaceDiv.style.display="block";
        textarea.style.background = "white";

        fetch("", {     //on recupère le code source de la page pour faire un virtualDOM
           method: 'get',
           headers: {
           'Accept': 'text/plain',
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
          console.log(virtualInterface);
          });
        }else{
        console.log("PAS CONNECTÉ");
        interfaceDiv.remove();
        

      }
  });



function glup (e){
  console.log("BAHHHHHHHH!");
  textarea.innerHTML = textarea.value;
  content.innerHTML =  marked(textarea.value); //la fonction qui traduit le markdown de la textarea en html pour l'afficher dans #content
  virtualDOM.getElementById('content').innerHTML = content.innerHTML;
  virtualDOM.getElementById('interface').style.display = 'none';
  virtualDOM.getElementById('textarea').innerHTML = textarea.value; 
  var s = new XMLSerializer();
  var str = s.serializeToString(virtualDOM);

  textarea.style.backgroundColor = "rgb(255, 130, 130)";
  unresolvedPosts++;
  fetch('', {                               
      method: 'post',
      headers: {
       'Accept': 'application/json, text/plain',
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({html:str})
     }).then((response) => {

        return response.json();
      }).then((data) => {
          console.log(data.state);
          if(data.state=="saved"){
            unresolvedPosts--;
            console.log(unresolvedPosts);
           
            if(unresolvedPosts == 0){
            textarea.style.background = "white";
            textarea.style.transition = "0.3s";
            }

          }
      });

}







 


