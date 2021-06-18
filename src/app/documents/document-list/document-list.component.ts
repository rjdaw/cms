import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document(1, 'Cool Document', 'It is cool indeed', 'https://url1.com'),
    new Document(2, 'Nice Document', 'It is nice indeed', 'https://url2.com'),
    new Document(3, 'Magic Document', 'It is magic indeed', 'https://url3.com'),
    new Document(4, 'Great Document', 'It is great indeed', 'https://url4.com')
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
