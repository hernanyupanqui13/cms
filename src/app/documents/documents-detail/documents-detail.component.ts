import { Component, Input, OnInit } from '@angular/core';
import { DocumentModel } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WinRefService } from '../../win-ref.service';

@Component({
  selector: 'app-documents-detail',
  templateUrl: './documents-detail.component.html',
  styleUrl: './documents-detail.component.css',
})
export class DocumentsDetailComponent implements OnInit {
  public document: DocumentModel;
  nativeWindow: any;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router,
    private windRef: WinRefService
  ) {
    this.nativeWindow = this.windRef.getNativeWindow();
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.document = this.documentService.getDocument(id);
    });
  }

  onView(): void {
    if(this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() : void {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }
}
