import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  standalone: false,
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  fileName: string = '';
  selectedFile: File | null = null;
  isLoading: boolean = false;

  // URL do seu backend Flask
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.fileName = this.selectedFile!.name;
      console.log('Arquivo selecionado:', this.selectedFile);
    }
  }

  clickBotao() {
    if (!this.selectedFile) {
      alert('Por favor, selecione um arquivo primeiro!');
      return;
    }

    const allowedTypes = ['.csv', '.xlsx', '.xls'];
    const fileExtension = this.fileName.toLowerCase().substring(this.fileName.lastIndexOf('.'));

    if (!allowedTypes.includes(fileExtension)) {
      alert('Tipo de arquivo não permitido! Use apenas CSV, XLS ou XLSX.');
      return;
    }

    this.isLoading = true;

    const formData = new FormData();
    formData.append('file', this.selectedFile!);

    this.http.post(`${this.apiUrl}/uploadArquivo`, formData, { responseType: 'text' }).subscribe({
      next: (response: string) => {
        console.log(response);
        const parsed = JSON.parse(response);
        console.log('Arquivo processado:', parsed);
        console.table(parsed.data);
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erro ao enviar arquivo:', error);
        this.isLoading = false;
      }
    });
  }
  
  testConnection() {
    console.log('🔍 Testando conexão com a API...');

    this.http.get(`${this.apiUrl}/health`).subscribe({
      next: (response: any) => {
        console.log('✅ Conexão com a API funcionando!', response);
        alert('API está funcionando: ' + response.message);
      },
      error: (error: HttpErrorResponse) => {
        console.error('❌ Erro na conexão com a API:', error);
        alert('Erro na conexão com a API. Verifique se o backend está rodando.');
      }
    });
  }
}


