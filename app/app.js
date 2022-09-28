// Dependencies to install:
// $ npm install node-fetch --save

const express = require('express');
const app = express()

const fetch = require('node-fetch');

require('dotenv').config()

app.use(express.static('./method-public'));

app.use(express.urlencoded({extended : false}));

// console.log(process.env.APIKEY);



app.post('/joinride', (req,res) => {

  const emailId = req.body.emailId;

  const validateEmail = (emailId) => {
    return String(emailId)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };


  if(validateEmail(emailId) === null || emailId === null) {
    return res.redirect("properEmail.html"); 
  }
  else {
  async function sendDetails() {
    const courier_options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + process.env.APIKEY
        },
        body: JSON.stringify({
          "message": {
            "routing": {    
              "method": "single",
              "channels": ["email"]
            },
            "to": {
              "email": emailId,
            //   "email": "tejasgaikwad0504@gmail.com", // for sendin to more than one user do this, you have to specify all user emails here
            },
            "content": {
              "title": "Ride Details :- ",
              "body": "Hey thanks for coming on Ride.\n\n Here is a Details about ride :-\n\n Start: NewDelhi, India. \n Destn : Delhi Gate, India.\n Time : 7:00am to 12:00pm\n\n Let's cathch up on this sunday."
            },
          }
        })
      };
      fetch('https://api.courier.com/send', courier_options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));   
        res.redirect("joined.html"); 
}
sendDetails(); 
}

  // console.log(validateEmail(emailId));

  // function validateEmail(emailId) 
  // {
  //     var re = /\S+@\S+\.\S+/;
  //     return re.test(emailId);
  // }
  // console.log(validateEmail);
  // if(validateEmail(emailId)) {
  
  // }
  // else {   
  //   
  // }
    
});

app.listen(5000, (req, res)=> {
    console.log('Server is listening on PORT 5000');
})

        // const morse_options = {
        //     method: 'GET',
        //     headers: {
        //       Accept: 'application/json',
        //       'Content-Type': 'application/json',
        //     },
        //   };
       
          // const morse_response = await fetch(`https://api.funtranslations.com/translate/morse.json?text=${msg}`, morse_options)
            // .then(response => response.json())
            // .then(response => console.log(response.contents.translated))
            // .catch(err => console.error(err));    
            // const translation = await morse_response.json();
            // const message = translation.contents.translated