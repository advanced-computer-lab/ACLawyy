
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