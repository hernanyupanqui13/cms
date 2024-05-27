import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit{
  public contacts :  Contact[] = []; 

  

  constructor(private contactsService: ContactsService) {
  }

  ngOnInit() : void {
    
    this.contacts = this.contactsService.getContacts();
    this.contactsService.contactChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });

  }
}
