
      var loginButton = document.getElementById('login-button');
      var password = document.getElementById('password-field');
      var username = document.getElementById('username-field');
      var content = document.getElementById('content');
      loginButton.onclick = connect;
      logoutButton.onclick = disconnect;


      function disconnect() {
        fetch("/logout", {
          method: "get"
        })
      }


      function connect() {

         console.log(password.value, username.value )

        fetch("/login", {
        method: 'post',
        headers: {
         'Accept': 'application/json, text/plain, */*',
         'Content-Type': 'application/json'
        },
        body: JSON.stringify({'username':username.value, 'password':password.value})
        }).then(function(response) {
          return response.json();
        }).then(function(data){
          if(data.connected){
            console.log(data);
            content.innerHTML = content.innerHTML + "<h2>C'est bon t'es connecté!!!!</h2> <br> dsl cette page est un peu moche et bricolée (ce qui peut être chouette aussi, mais bon je la changerai quand même à un moment)"
          }
        });
        


      }
