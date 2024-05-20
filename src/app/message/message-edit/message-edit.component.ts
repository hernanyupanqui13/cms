import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  subject : string;
  msgText : string;
  currentSenderId : string = "1";
  @Output() addMessageEvent: EventEmitter<Message> = new EventEmitter<Message>();
  @ViewChild('msgTextElem') msgTextElem: ElementRef;
  @ViewChild('subjectElem') subjectElem: ElementRef;

  constructor(private messageService: MessageService) { }

  onSendMessage() : void {
    this.subject = this.subjectElem.nativeElement.value;
    this.msgText = this.msgTextElem.nativeElement.value;
    
    const msg = new Message("1", this.subject, this.msgText, this.currentSenderId);
    this.messageService.addMessage(msg);
    
    // Cleaning the inputs 
    this.onClear();

  }

  onClear() : void {
    this.subject = '';
    this.msgText = '';
    this.msgTextElem.nativeElement.value = '';
    this.subjectElem.nativeElement.value = '';
  }
}
