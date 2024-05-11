import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cms';
  @Input() selectedFeature : string = 'documents';


  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }


}
