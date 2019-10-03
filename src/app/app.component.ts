import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as FileSaver from "file-saver";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JSReport-Sample';

  constructor(
    private http: HttpClient,

  ) {}


  downloadFile(){
    this.getFile().subscribe((res) => {
      this.saveAsPDF(res, 'invoice');
    }, (err) => {
      console.error(err);
    });
  }

  getFile() {
    return this.http.get('https://localhost:5489/templates/HJH11D83ce', { responseType: 'blob' });
  }

  saveAsPDF(blob: Blob, fileName: string) {
    let file = new Blob([blob], { type: 'application/pdf' });
    FileSaver.saveAs(file, `${fileName}.pdf`);
  }
}
