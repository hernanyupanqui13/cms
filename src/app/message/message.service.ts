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
  private readonly BASE_URL = 'http://localhost:3000/';

  constructor(private readonly http: HttpClient) {
    this.messages = [];
    this.maxMessageId = this.getMaxId();
  }

  public getMessages(): Message[] {
    type ServerResponse = {
      message: string;
      messages: Message[];
    };
    this.http.get<ServerResponse>(`${this.BASE_URL}messages`).subscribe({
      next: (response) => {
        this.messages = response.messages;
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

    message.id = '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<{ message: string; createdMessage: Message }>(
        this.BASE_URL + 'messages',
        message,
        { headers: headers }
      )
      .subscribe({
        next: (response) => {
          response.createdMessage.sender = message.sender;// temp
          this.messages.push(response.createdMessage);
          this.messageChangedEvent.next(this.messages.slice());
        },
        error: (error: any) => {
          console.error(error);
        },
      });
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

}
