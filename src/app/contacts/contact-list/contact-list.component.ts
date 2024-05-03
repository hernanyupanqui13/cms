import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit{
  public contacts :  Contact[] = [
    new Contact (1, "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771"
    , "../../assets/images/jacksonk.jpg", null),
    new Contact (2, "Rex Barzee", "barzeer@byui.edu", "208-496-3768"
    , "../../assets/images/barzeer.jpg", null)
  ]; 


  ngOnInit() {
    // const contact1 : Contact = new Contact (1, "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771"
    // , "../../assets/images/jacksonk.jpg", null);
    // this.contacts.push(contact1); 

    // const contact2 : Contact = new Contact (2, "Rex Barzee", "barzeer@byui.edu", "208-496-3768"
    // , "../../assets/images/barzeer.jpg", null);
    // this.contacts.push(contact2); 

    console.log("its working");
  }
}
