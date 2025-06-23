import nodemailer from 'nodemailer'

// sendGrid 

interface IMailInformation{
    to : string, 
    subject : string, 
    text : string
}

const sendMail = async (mailInformation:IMailInformation)=>{
 // mail pathaune logic goes here : 
 // step 1 : create nodemailer Transport 
 // transporter/transport ---> configuration setup lai transport 
 // manish@gmail.com -- mail snt huncha 
 // manish@yahoo.com --> 
 // auth --> tapai ko/ tapai ko business ko gmail, password k ho tyo hamro auth ho, 
 // sender ko gmail/password 
 const transporter = nodemailer.createTransport({
    service : "gmail",  // yahoo, hotmail 
    auth : {
        user : process.env.NODEMAILER_GMAIL,
        pass : process.env.NODEMAILER_GMAIL_APP_PASSWORD// real password hainw --> app password ho (GOOGLE account --> search app password -- create -- remove space of app password)
    }
 })

 const mailFormatObject = {
    from : "SaaS MERN <dptest1230@gmail.com>",
    to : mailInformation.to, 
    subject : mailInformation.subject, 
    text : mailInformation.text
 }

try {
    await transporter.sendMail(mailFormatObject)
} catch (error) {
    console.log(error)
}

}


export default sendMail 