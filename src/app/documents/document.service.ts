import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { DocumentModel } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documents: Array<DocumentModel> = [];
  documentSelectedEvent: EventEmitter<DocumentModel> =
    new EventEmitter<DocumentModel>();
  documentListChangedEvent: Subject<Array<DocumentModel>> = new Subject<
    Array<DocumentModel>
  >();
  private maxDocumentId: number;
  private readonly BASE_URL =
    'https://wdd430-cms-37ef7-default-rtdb.firebaseio.com/';

  constructor(private readonly http: HttpClient) {
    this.documents = [];
    this.maxDocumentId = this.getMaxId();
  }

  public getDocuments(): DocumentModel[] {
    this.http.get<DocumentModel[]>(this.BASE_URL + 'documents.json').subscribe({
      next: (documents: DocumentModel[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        this.documentListChangedEvent.next(this.documents.slice());
      },
      error: (error: any) => {
        console.error(error);
      },
    });

    return this.documents.slice();
  }

  public getDocument(id: string): DocumentModel {
    return this.documents.find((document) => document.id === id) || null;
  }

  public onSelectedDocument(document: DocumentModel): void {
    this.documentSelectedEvent.emit(document);
  }

  private getMaxId(): number {
    let maxId = 0;

    for (let document of this.documents) {
      let currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  public addDocument(newDocument: DocumentModel): void {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId + '';
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  public updateDocument(
    originalDocument: DocumentModel,
    newDocument: DocumentModel
  ): void {
    if (!originalDocument || !newDocument) {
      return;
    }

    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

  public deleteDocument(document: DocumentModel): void {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.storeDocuments();
  }

  storeDocuments(): void {
    const documents = JSON.stringify(this.documents);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(this.BASE_URL + 'documents.json', documents, { headers: headers })
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }
}
