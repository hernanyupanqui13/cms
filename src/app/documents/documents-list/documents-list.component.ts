import { Component, EventEmitter, Output } from '@angular/core';
import { DocumentModel } from '../document.model';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrl: './documents-list.component.css'
})
export class DocumentsListComponent {
  documents: Array<DocumentModel> = [
    new DocumentModel(1, 'CIT 260 - Object Oriented Programming', 'A great course', 'https://www.google.com'),
    new DocumentModel(2, 'CIT 366 - Full Stack Web Development', 'Learn how to develop modern web applications using MEAN stack'
      , 'https://byui.instructure.com/courses/294156/assignments/syllabus'),
    new DocumentModel(3, 'CIT425 - Data Warehousing', 'Data Warehousing means working with a lot of data in DB. Great course!', 'https://www.google.com'),
    new DocumentModel(4, 'CIT 460 - Enterprise Development', 'Computer Information technology course', 'https://www.google.com'), 
    new DocumentModel(4, 'CIT 495 - Senior Practicum', 'A Senior course', 'https://www.google.com')
  ];

  @Output() selectedDocumentEvent : EventEmitter<DocumentModel> = new EventEmitter<DocumentModel>();


  public onSelectedDocument(document: DocumentModel) : void {
    this.selectedDocumentEvent.emit(document);
  }


}
