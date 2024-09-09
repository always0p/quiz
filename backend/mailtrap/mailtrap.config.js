import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

export const mailtrapClient = new MailtrapClient({
	endpoint: process.env.MAILTRAP_ENDPOINT,
	token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
	email: "mailtrap@demomailtrap.com",
    name:"Mailtrap Test"
	
};












// const recipients=[
//     {
//     email:"mailtrap@demomailtrap.com"
// }
// ];



// curl --location --request POST \
// 'https://send.api.mailtrap.io/api/send' \
// --header 'Authorization: Bearer 813ffd6afe2c8384cea550e43ac6e9d0' \
// --header 'Content-Type: application/json' \
// --data-raw '{"from":{"email":"mailtrap@demomailtrap.com","name":"Mailtrap Test"},"to"'
