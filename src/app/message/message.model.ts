export class Message {
    id: number;
    subject: string;
    msgText: string;
    sender: string;

    constructor(id: number, subject: string, msgText: string, sender: string) {
        this.id = id;
        this.subject = subject;
        this.msgText = msgText;
        this.sender = sender;
    }
}