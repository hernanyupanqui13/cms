import { Component, OnInit } from '@angular/core';
import { DocumentModel } from '../document.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css',
})
export class DocumentEditComponent implements OnInit {
  originalDocument: DocumentModel;
  document: DocumentModel;
  editNote: boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (!id) {
        this.editNote = false;
        return;
      }
      this.originalDocument = this.documentService.getDocument(id);
      if (!this.originalDocument) {
        return;
      }
      this.editNote = true;
      this.document = structuredClone(this.originalDocument);
    });
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new DocumentModel(
      value.id,
      value.name,
      value.description,
      value.url
    );
    if (this.editNote) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']);
  }
}
