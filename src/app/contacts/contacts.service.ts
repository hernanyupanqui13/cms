import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contacts : Array<Contact> = [];
  contactSelectedEvent : EventEmitter<Contact> = new EventEmitter<Contact>();
  contactListChangedEvent : Subject<Array<Contact>> = new Subject<Array<Contact>>();
  private maxContactId : number;

  constructor() { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }


  public getContacts(): Contact[] {
    return this.contacts.slice();
  }

  public getContact(id: string): Contact {
    return this.contacts.find(contact => contact.id === id)  || null;
  } 

  private getMaxId(): number {
    let maxId = 0
    
    for (let contact of this.contacts) {
      let currentId = parseInt(contact.id)
      if (currentId > maxId) {
        maxId = currentId
      }
    }

    return maxId
  }

  public addContact(newContact: Contact) : void {
    if (!newContact) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId + "";
    this.contacts.push(newContact);
    let contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
  }

  public updateContact(originalContact: Contact, newContact: Contact) : void {
    if (!originalContact ||!newContact) {
      return;
    }

    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
  }


  public deleteContact(contact: Contact) : void {
    if (!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    let contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
  }
  
}
