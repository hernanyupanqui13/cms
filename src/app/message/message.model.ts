export class Message {
    id: string;
    subject: string;
    msgText: string;
    sender: string;

    constructor(subject: string, msgText: string, sender: string) {
        this.id = "";
        this.subject = subject;
        this.msgText = msgText;
        this.sender = sender;
    }
}