
const nodeMailer = require('nodemailer');
const transporter = nodeMailer.createTransport({
    service:"hotmail",
    auth:{
        user:"flightsawy@outlook.com",//Email Address
        pass:"ACLawyyy",//password

    }
});
const options = {
    from:"flightsawy@outlook.com",
    to:"mohamedeltantawi0@gmail.com",
    subject:"Test",
    text:"test succesful i hope"
};
transporter.sendMail(options,function(err,info){
    if(err){
        console.log(err);
        return;
    }
    console.log("Sent :"+info.response);
})
const sendMail = () => {
    alert("mail sent");
    const obj = {
      email : user.Email,
      subject : "Itinerary",
      text : "The user itinerary"
    }
    axios
                  .post("http://localhost:8000/Tickets/email", 
                    obj
                  )
                  .then((res) => {
                    console.log("mail sent");
                  }).catch((err) => {
                    console.log(err)
                  })
  };