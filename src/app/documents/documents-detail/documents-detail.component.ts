import { Component, Input } from '@angular/core';
import { DocumentModel } from '../document.model';

@Component({
  selector: 'app-documents-detail',
  templateUrl: './documents-detail.component.html',
  styleUrl: './documents-detail.component.css'
})
export class DocumentsDetailComponent {
  @Input() document: DocumentModel;
}
