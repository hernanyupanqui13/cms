import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { DocumentModel } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Array<DocumentModel> = [];
  documentSelectedEvent : EventEmitter<DocumentModel> = new EventEmitter<DocumentModel>();


  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }


  public getDocuments(): DocumentModel[] {
    return this.documents.slice();
  }

  public getDocument(id: string) : DocumentModel {
    return this.documents.find(document => document.id === id) || null;
  }

  public onSelectedDocument(document: DocumentModel) : void {
    this.documentSelectedEvent.emit(document);
  }
}