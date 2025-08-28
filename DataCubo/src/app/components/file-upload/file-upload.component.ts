import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  standalone: false,
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
   fileName: string = '';

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.fileName = event.target.files[0].name;
    }
  }

  clickBotao(){
    alert('ok');
  }
}

