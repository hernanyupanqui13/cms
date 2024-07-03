import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  contacts: Array<Contact> = [];
  contactSelectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>();
  contactListChangedEvent: Subject<Array<Contact>> = new Subject<
    Array<Contact>
  >();
  private maxContactId: number;
  private readonly BASE_URL = 'http://localhost:3000/';

  constructor(private readonly http: HttpClient) {
    this.contacts = [];
    this.maxContactId = this.getMaxId();
  }

  public getContacts(): Contact[] {
    this.http
      .get<{ message: string; contacts: Contact[] }>(`${this.BASE_URL}contacts`)
      .subscribe((res) => {
        this.contacts = res.contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        this.contactListChangedEvent.next(this.contacts.slice());
      });
    return this.contacts.slice();
  }

  public getContact(id: string): Contact {
    return this.contacts.find((contact) => contact.id === id) || null;
  }

  private getMaxId(): number {
    let maxId = 0;

    for (let contact of this.contacts) {
      let currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  public addContact(newContact: Contact): void {
    if (!newContact) {
      return;
    }

    newContact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<{ message: string; createdContact: Contact }>(
        `${this.BASE_URL}contacts`,
        newContact,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.contacts.push(responseData.createdContact);
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }

  public updateContact(originalContact: Contact, newContact: Contact): void {
    console.log('original', newContact);
    if (!originalContact || !newContact) {
      return;
    }

    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put<{ message: string; updatedContact: Contact }>(
        `${this.BASE_URL}contacts/${originalContact.id}`,
        newContact,
        {
          headers: headers,
        }
      )
      .subscribe(() => {
        console.log('updated', newContact);
        this.contacts[pos] = newContact;
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }

  public deleteContact(contact: Contact): void {
    if (!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.http.delete(`${this.BASE_URL}contacts/${contact.id}`).subscribe(() => {
      this.contacts.splice(pos, 1);
      this.contactListChangedEvent.next(this.contacts.slice());
    });
  }

  
}
