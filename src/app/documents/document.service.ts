import { EventEmitter, Injectable } from '@angular/core';
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
  private readonly BASE_URL = 'http://localhost:3000/';

  constructor(private readonly http: HttpClient) {
    this.documents = [];
    this.maxDocumentId = this.getMaxId();
  }

  public getDocuments(): DocumentModel[] {
    type ServerResponse = {
      message: string;
      documents: DocumentModel[];
    };

    this.http.get<ServerResponse>(`${this.BASE_URL}documents`).subscribe({
      next: (serverResponse) => {
        this.documents = serverResponse.documents;
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

    newDocument.id = '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Add to database
    this.http
      .post<{ message: string; document: DocumentModel }>(
        'http://localhost:3000/documents',
        newDocument,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // Add new document to documents
        this.documents.push(responseData.document);
        this.sortAndSend();
      });
  }

  private sortAndSend(): void {
    this.documents.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    this.documentListChangedEvent.next(this.documents.slice());
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

    // Set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Update database
    this.http
      .put(`${this.BASE_URL}documents/${originalDocument.id}`, newDocument, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.documents[pos] = newDocument;
        this.sortAndSend();
      });
  }

  public deleteDocument(document: DocumentModel): void {
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === document.id);
    if (pos < 0) {
      return;
    }

    // Delete from database
    this.http
      .delete(`${this.BASE_URL}documents/${document.id}`)
      .subscribe((response: Response) => {
        this.documents.splice(pos, 1);
        this.sortAndSend();
      });
  }
}
