import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contacts : Array<Contact> = [];
  contactSelectedEvent : EventEmitter<Contact> = new EventEmitter<Contact>();

  constructor() { 
    this.contacts = MOCKCONTACTS;
  }


  public getContacts(): Contact[] {
    return this.contacts.slice();
  }

  public getContact(id: string): Contact {
    return this.contacts.find(contact => contact.id === id)  || null;
  } 

  


}
