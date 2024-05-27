import { Component } from '@angular/core';
import { Contact } from '../contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css',
})
export class ContactDetailComponent {
  public contactDetail: Contact;

  constructor(
    private contactsService: ContactsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.contactDetail = this.contactsService.getContact(id);
    });
  }


  onDelete() {
    this.contactsService.deleteContact(this.contactDetail);
    this.router.navigateByUrl('/contacts');
  }
}
