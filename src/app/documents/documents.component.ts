import { Component, OnInit } from '@angular/core';
import { DocumentModel } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent implements OnInit{
  selectedDocument: DocumentModel;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documentService.documentSelectedEvent.subscribe(
      (document: DocumentModel) => {
        this.selectedDocument = document;
      }
    )
  }

}
