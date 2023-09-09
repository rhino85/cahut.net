//faire une fonction à appeler à la fin du fetch
//faire fonction FileHtml()
//





function createFilesHtml(files) {
  let htmlString = "";
  for (let index = 0; index < files.length; index++) {
  if (files[index].isDirectory) {

      htmlString += "<p draggable='true' id="+files[index].name+"  ondrop='drop_handler(event)' ondragenter='dragenter_handler(event)' ondragleave='dragleave_handler(event)'> <a draggable='false' href=" + window.location.pathname + files[index].name + "/>" + files[index].name + "/</a> <span style='position:absolute;right:0px'><span class='folder-icon'>📁</span><span class='delete' value="+ window.location.pathname.slice(7) + files[index].name +">❌</span></span></p>";

    } else {

      htmlString += "<p draggable='true' id="+files[index].name+" ><a draggable='false' href=" + window.location.pathname.slice(7) + files[index].name + ">" + files[index].name + "</a> <span style='position:absolute;right:0px'><a href=" + window.location.pathname.slice(7) + files[index].name + "::source>::source</a><span class='renamme-icon'>🖊️</span><span class='delete'value="+ window.location.pathname.slice(7) + files[index].name +">❌</span></span></p>";

    }
  }


  return htmlString;

}





function dragenter_handler(event){
  event.preventDefault();
  event.target.style = "background-color:green";

}

function dragleave_handler(event){
  event.preventDefault();
  event.target.style = "background-color:white";

}

function drop_handler(event){

  event.preventDefault();
  console.log("limasse");

  console.log(event);

}

////////


var htmlString = "";


//on demande au serveur de nous envoyer la liste des fichiers/dossiers 
fetch('' + "!getfilelist", {
  method: 'get',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
}).then((response) => {
  return response.json();
}).then((data) => {
  if (data) {
    //console.log(data.files);
    htmlString = createFilesHtml(data.files);



    //console.log(htmlString);
    fileList.innerHTML = htmlString;
    console.log("OK");

    const delbuttons = document.querySelectorAll('.delete');       //les labels "❌"
    console.log(delbuttons);

for (let index = 0; index < delbuttons.length; index++) {      //boucle pour mettre des events listener sur les "❌"
  console.log("DIDON!");
  let button = delbuttons[index];
  button.addEventListener('click', function (event) {

    if (window.confirm("FAIS BIEN ATTENTION TU ES ENTRAIN DE SUPPRIMER QUELQUE CHOSE DEFINITIVEMENT, SI C'EST UN DOSSIER TU SUPPRIME SON CONTENU AUSSI !!! j'ai pas encore eut le courage de mettre un fonction 'revenir en arrière' et je suis très masochiste alors si tu perds des trucs auquels tu tiens je vais m'en vouloir de ouf, stp fais pas de connerie, sois responsable et attentif peut-être?, je sais que les boites de dialogues qui te laissent le choix entre 'ok' et 'cancel' c'est de la merde mais bon pour le moment je me contente de ça, je peux pas me permettre d'etre trop perfectionniste sinon je ferai rien de ma vie")) {

      fetch(encodeURI(event.target.attributes.value.value), {
        method: 'delete',
      }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);
        window.location.reload(); //crappy but fuck, enough for now, i will use vue in the future, i swear

      });
    }
  });
}

  }


});


const fileList = document.querySelector("#file-list");
const title = document.querySelector("#title");


let titletemp = window.location.pathname.slice(7);
titletemp = decodeURI(titletemp);
titlearray = titletemp.split("/");
titletemp = "<a href='/public/'>/</a> ";
let path = "/";
for (let index = 1; index < (titlearray.length - 1); index++) {
  path = path + titlearray[index] + "/";
  titletemp = titletemp + "<a href=/public" + path + ">" + titlearray[index] + "/" + "</a>  ";
}

title.innerHTML = titletemp;



const wait = document.querySelector("#wait");
const fileSelector = document.querySelector("#fileSelector");  //input type file
const nameInput = document.querySelector('#fileName');          //input type text
const fileUpload = document.querySelector('#fileUpload');       //le petit trombonne
const createFolder = document.querySelector('#createFolder');       //le petit dossier
const submitButton = document.querySelector('#submit');

fileSelector.style.opacity = 0;                                //on l'invibilise pck c'est moche, juste besoin de la logique qu'il permet
fileSelector.style.cssText = "position: absolute; margin-top: 3px; margin-left: 3px; height: 1px; width: 1px;";


nameInput.style.display = "none";
submitButton.style.display = "none";





createFolder.addEventListener('click', function (event) {


  createFolder.style.display = "none";
  fileUpload.style.display = "none";
  nameInput.style.display = "inline";
  nameInput.focus();
  nameInput.value = "";
  nameInput.placeholder = "nom du dossier?";
  submitButton.style.display = "inline";
  submitButton.addEventListener('click', function () {
    console.log("let's create a folder named : " + nameInput.value);
    let body = {
      action: "createFolder",
      name: nameInput.value
    };
    console.log(body);
    fetch("", {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("wow ok, i have a folder named : ");
      console.log(data);
      // i should append it to content wow (i tried but wow way more difficult than i thought..., i am going to reload page instead)
      window.location.reload(); //crappy but fuck, enough for now, i will use vue in the future, i swear
    });
  })



  /*
  

  */
});





fileSelector.addEventListener('change', function (event) {
  wait.innerHTML = "fais gaffe à ce qu'il n'y ait pas déjà un fichier du meme nom! (ça va pas l'écraser mais ça va pas marcher quoi)";
  createFolder.style.display = "none";
  fileUpload.style.display = "none";
  nameInput.style.display = "inline";
  nameInput.value = fileSelector.files[0].name;
  nameInput.focus();
  submitButton.style.display = "inline";
  submitButton.addEventListener('click', function () {
    let encodedURI = encodeURI(nameInput.value);
    console.log(encodedURI);
    nameInput.style.display = "none";
    submitButton.style.display = "none";
    wait.innerHTML = "envoi en cours^^ att un peu! <br> <img src='https://cahut.net/chat-rigolo.gif'> <br><br><br>";
    /* mettre un gif drole */
    const formData = new FormData();
    formData.append('sampleFile', fileSelector.files[0]);
    fetch(encodedURI, {
      method: 'PUT',
      body: formData
    })
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
        if (result.message) {
          window.location.reload(); //crappy but fuck, enough for now, i will use vue in the future, i swear
        } else {
          wait.innerHTML = "y'avait déjà un fichier du meme nom du coup ça n'a pas fonctionné, je sais c'est chiant j'ameliorerai plus tard!!!";
        }

      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
});
