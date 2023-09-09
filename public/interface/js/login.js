var logoutButton = document.getElementById('logout-button');
      var loginButton = document.getElementById('login-button');
      var password = document.getElementById('password-field');
      var username = document.getElementById('username-field');
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
          }
        });
        


      }
