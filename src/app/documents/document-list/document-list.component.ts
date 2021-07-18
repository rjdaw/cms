import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[];
  private subscription: Subscription;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documentsList: Document[]) => {
        this.documents = documentsList;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}