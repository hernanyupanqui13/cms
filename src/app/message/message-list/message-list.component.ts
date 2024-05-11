import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages : Array<Message> = [
    new Message(1, 'Hi', 'Hi! What is your name?', 'Hernan'),
    new Message(2, 'Goodbye', 'Good bye. See you soon', 'Hernan'),
    new Message(3, 'What?', 'Doyou know what is happening?', 'Hernan'),
    new Message(4, 'Urgent', 'This is very urgent', 'Hernan'),
  ];


  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
