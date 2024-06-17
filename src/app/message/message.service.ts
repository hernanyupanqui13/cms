import { EventEmitter, Injectable } from '@angular/core';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private maxMessageId: number;
  private messages: Array<Message> = [];
  public messageChangedEvent: Subject<Message[]> = new Subject<Message[]>();
  private readonly BASE_URL =
    'https://wdd430-cms-37ef7-default-rtdb.firebaseio.com/';

  constructor(private readonly http: HttpClient) {
    this.messages = [];
    this.maxMessageId = this.getMaxId();
  }

  public getMessages(): Message[] {
    this.http.get<Message[]>(this.BASE_URL + 'messages.json').subscribe({
      next: (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messages.sort((a, b) =>
          a.subject > b.subject ? 1 : b.subject > a.subject ? -1 : 0
        );
        this.messageChangedEvent.next(this.messages.slice());
      },
      error: (error: any) => {
        console.error(error);
      },
    });
    return this.messages.slice();
  }

  public getMessage(id: string): Message {
    return this.messages.find((message) => message.id === id) || null;
  }

  public addMessage(message: Message): void {
    if (!message) {
      return;
    }

    this.maxMessageId++;
    message.id = this.maxMessageId.toString();
    this.messages.push(message);
    this.storeMessages();
  }

  private getMaxId(): number {
    let maxId = 0;

    for (let document of this.messages) {
      let currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  storeMessages() {
    this.messages = JSON.parse(JSON.stringify(this.messages));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(this.BASE_URL + 'messages.json', this.messages, { headers: headers })
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      });
  }
}
