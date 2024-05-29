import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import { EMAIL, PASSWORD } from '../../env.mjs';

export class Mailer {
    async send_real_mail(req, res) {
        const { eventType, eventDetail, userEmail, userName, day, eventName, date, startTime, endTime } = req.body;
        console.log(userEmail, userName, day, eventName, date, startTime, endTime);

        const config = {
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        };

        const transporter = nodemailer.createTransport(config);

        try {
            // Log to ensure EMAIL and PASSWORD are correctly loaded
            console.log('Email:', EMAIL);
            console.log('Password:', PASSWORD ? 'Password is set' : 'Password is not set');

            const MailGenerator = new Mailgen({
                theme: 'default',
                product: {
                    name: 'Event Scheduler of Kalenview',
                    link: 'https://mailgen.js'
                }
            });

            const response = {
                body: {
                    name: userName,
                    intro: `You have an upcoming event/meeting: ${eventName}`,
                    table: {
                        data: [
                            { 'Event Info': 'Date', description: date },
                            { item: 'Day', description: day },
                            { item: 'Start Time', description: startTime },
                            { item: 'End Time', description: endTime },
                            { item: 'Event Location', description: eventType },
                            { item: 'Event Description', description: eventDetail }
                        ]
                    },
                    outro: "Kindly be present there as per the scheduled time"
                }
            };

            const mail = MailGenerator.generate(response);

            let message = {
                from: EMAIL,
                to: [userEmail, "pramanickdebesh1412@gmail.com"],
                subject: `Event Reminder: ${eventName}`,
                html: mail
            };

            transporter.sendMail(message).then(() => {
                return res.status(201).json({ "msg": "Email is sent" });
            }).catch(error => {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: 'Failed to send email' });
            });

        } catch (error) {
            console.error('Mailgen initialization error:', error);
            return res.status(500).json({ error: 'Mailgen initialization failed' });
        }
    }
}
