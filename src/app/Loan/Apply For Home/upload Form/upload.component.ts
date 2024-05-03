import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['/uplaod.component.css']
})
export class uploadComponent implements OnInit {
  uploadForm!: FormGroup;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });
  }

  // Méthode pour gérer l'envoi du fichier
  onSubmit() {
    if (this.uploadForm && this.uploadForm.get('file')) {
      const formData = new FormData();
      formData.append('file', this.uploadForm.get('file')!.value);

      this.httpClient.post('http://localhost:8081/api/v1/pdf/upload', formData)
        .subscribe(
          () => {
            console.log('PDF document uploaded successfully');
          },
          error => {
            console.error('Failed to upload PDF document:', error);
          }
        );
    }
  }

  // Méthode pour gérer la sélection du fichier
  onFileSelected(event: any) {
    if (this.uploadForm) {
      this.uploadForm.get('file')!.setValue(event.target.files[0]);
    }
  }
}
