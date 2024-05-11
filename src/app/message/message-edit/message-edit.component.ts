import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  subject : string;
  msgText : string;
  currentSender : string = "Hernan Yupanqui";
  @Output() addMessageEvent: EventEmitter<Message> = new EventEmitter<Message>();
  @ViewChild('msgTextElem') msgTextElem: ElementRef;
  @ViewChild('subjectElem') subjectElem: ElementRef;



  onSendMessage() {
    this.subject = this.subjectElem.nativeElement.value;
    this.msgText = this.msgTextElem.nativeElement.value;
    const msg = new Message(1, this.subject, this.msgText, this.currentSender);
    this.addMessageEvent.emit(msg);
    // Cleaning the inputs 
    this.onClear();

  }

  onClear() {
    this.subject = '';
    this.msgText = '';
    this.msgTextElem.nativeElement.value = '';
    this.subjectElem.nativeElement.value = '';
  }
}
