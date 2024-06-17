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
  private readonly BASE_URL =
    'https://wdd430-cms-37ef7-default-rtdb.firebaseio.com/';

  constructor(private readonly http: HttpClient) {
    this.contacts = [];
    this.maxContactId = this.getMaxId();
  }

  public getContacts(): Contact[] {
    this.http
      .get<Contact[]>(`${this.BASE_URL}contacts.json`)
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
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

    this.maxContactId++;
    newContact.id = this.maxContactId + '';
    this.contacts.push(newContact);
    this.storeContacts();
  }

  public updateContact(originalContact: Contact, newContact: Contact): void {
    if (!originalContact || !newContact) {
      return;
    }

    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

  public deleteContact(contact: Contact): void {
    if (!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.storeContacts();
  }

  storeContacts(): void {
    const contacts = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(`${this.BASE_URL}}contacts.json`, contacts, { headers: headers })
      .subscribe(() => {
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }
}
