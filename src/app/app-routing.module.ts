import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './message/message-list/message-list.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentsDetailComponent } from './documents/documents-detail/documents-detail.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';




const appRoutes : Routes = [
    { path: '', redirectTo: '/documents', pathMatch: 'full'},
    { path: 'contacts', component: ContactsComponent, children: [
        { path: 'new', component: ContactEditComponent},
        { path: ':id', component: ContactDetailComponent},
        { path: ':id/edit', component: ContactEditComponent}
    ]},
    { path: 'documents', component: DocumentsComponent, children: [
        { path: 'new', component: DocumentEditComponent},
        { path: ':id', component: DocumentsDetailComponent},
        { path: ':id/edit', component: DocumentEditComponent}
    ]},
    { path:'message', component: MessageListComponent}
]
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}