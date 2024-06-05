import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { DocumentModel } from './document.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Array<DocumentModel> = [];
  documentSelectedEvent : EventEmitter<DocumentModel> = new EventEmitter<DocumentModel>();
  documentListChangedEvent : Subject<Array<DocumentModel>> = new Subject<Array<DocumentModel>>();
  private maxDocumentId : number;

  constructor() { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
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
 
  private getMaxId(): number {
    let maxId = 0
    
    for (let document of this.documents) {
      let currentId = parseInt(document.id)
      if (currentId > maxId) {
        maxId = currentId
      }
    }

    return maxId
  }

  public addDocument(newDocument: DocumentModel) : void {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId + "";
    this.documents.push(newDocument);
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  public updateDocument(originalDocument: DocumentModel, newDocument: DocumentModel) : void {
    if (!originalDocument ||!newDocument) {
      return;
    }

    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  
  public deleteDocument(document: DocumentModel) : void {
    if (!document) {
       return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }

    this.documents.splice(pos, 1);
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }
}
