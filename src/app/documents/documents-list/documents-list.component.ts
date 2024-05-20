import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DocumentModel } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrl: './documents-list.component.css'
})
export class DocumentsListComponent implements OnInit{
  documents: Array<DocumentModel> = [];


  constructor(private documentService: DocumentService) {}


  public onSelectedDocument(document: DocumentModel) : void {
    this.documentService.documentSelectedEvent.emit(document);
  }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  }


}
