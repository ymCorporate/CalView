import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import { EMAIL, PASSWORD } from '../../env.mjs';

export class Mailer {

    async send_real_mail(req, res) {

        const { userEmail, userName, day, eventName, date, startTime, endTime } = req.body;
        console.log(userEmail, userName, day, eventName, date, startTime, endTime); // testmail@test.com New Name MON abcdef 2024-05-27 15:00 15:30

        const config = {
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        }

        const transporter = nodemailer.createTransport(config);

        const MailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Event Scheduler of Kalenview ",
                link: "https://mailgen.js"
            }
        });

        const response = {
            body: {
                name: userName,
                intro: `You have an upcoming event/meeting: ${eventName}`,
                table: {
                    data: [
                        {
                            item: 'Date',
                            description: date
                        },
                        {
                            item: 'Day',
                            description: day
                        },
                        {
                            item: 'Start Time',
                            description: startTime
                        },
                        {
                            item: 'End Time',
                            description: endTime
                        }
                    ]
                },
                outro: "Kindly be present there are per the scheduled time"
            }
        }

        const mail = MailGenerator.generate(response);

        let message = {
            from: EMAIL,
            to: [userEmail, "other_email"],
            subject: `Event Reminder: ${eventName}`,
            html: mail
        }

        transporter.sendMail(message).then(() => {
            return res.status(201).json({ "msg": "Email is sent" })
        }).catch(error => {
            return res.status(500).json({ error })
        });

    }
}
