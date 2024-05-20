import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit { 
  messages : Array<Message> = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe(
      (message: Message[]) => {
        this.messages = message;
      }
    )
  }

  onAddMessage(message: Message) : void {
    this.messages.push(message);
  }
  
}
