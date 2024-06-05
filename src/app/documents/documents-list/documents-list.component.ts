import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentModel } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrl: './documents-list.component.css'
})
export class DocumentsListComponent implements OnInit, OnDestroy{
  documents: Array<DocumentModel> = [];
  private subscription : Subscription;


  constructor(private documentService: DocumentService) {
    this.documents = this.documentService.getDocuments();
  }

  ngOnInit() : void {
    this.subscription = this.documentService.documentListChangedEvent.subscribe((documentsList: DocumentModel[]) => {
      this.documents = documentsList;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
