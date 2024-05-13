import { Component, Input } from '@angular/core';
import { DocumentModel } from '../document.model';

@Component({
  selector: 'app-documents-item',
  templateUrl: './documents-item.component.html',
  styleUrl: './documents-item.component.css'
})
export class DocumentsItemComponent {
  @Input() document: DocumentModel;
}
