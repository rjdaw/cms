import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model'
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[];
  private subscription: Subscription;
  term: string;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getContacts();
    this.contactService.contactChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      )

    this.subscription = this.contactService.contactListChangedEvent
    .subscribe(
      (contactList: Contact[]) => {
        this.contacts = contactList;
      }
    )
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}