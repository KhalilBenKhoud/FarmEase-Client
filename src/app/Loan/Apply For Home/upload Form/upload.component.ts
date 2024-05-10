import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ngx-captcha'; 

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./uplaod.component.css']
})
export class uploadComponent implements OnInit {
  uploadForm!: FormGroup;
  protected aFormGroup!: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
   
  ) {  }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });

   
  }
  

  onSubmit() {
    if (this.uploadForm.valid) {
      const formData = new FormData();
      formData.append('file', this.uploadForm.get('file')!.value);

      this.http.post('http://localhost:1005/api/v1/pdf/upload', formData)
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

  onFileSelected(event: any) {
    if (this.uploadForm) {
      this.uploadForm.get('file')!.setValue(event.target.files[0]);
    }
  }

  
}
