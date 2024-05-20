import { EventEmitter, Injectable } from '@angular/core';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages : Array<Message> = [];
  public messageChangedEvent : EventEmitter<Message[]> = new EventEmitter<Message[]>();

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  public getMessages(): Message[] {
    return this.messages.slice();
  }

  public getMessage(id: string) : Message {
    return this.messages.find(message => message.id === id) || null;
  }

  public addMessage (message: Message) : void {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  }
}
