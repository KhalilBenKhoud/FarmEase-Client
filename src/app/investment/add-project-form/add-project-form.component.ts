import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project2Service } from 'src/app/services/project2.service';
import { Project, ProjectCategory, ProjectStatus } from 'src/app/models/Project';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-add-project-form',
  templateUrl: './add-project-form.component.html',
  styleUrls: ['./add-project-form.component.css']
})

export class AddProjectFormComponent implements OnInit{
  projectForm!: FormGroup;
  categories: ProjectCategory[];
  statuses: ProjectStatus[];

  constructor(
    private formBuilder: FormBuilder,
    private projectService: Project2Service
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.categories = this.projectService.getProjectCategories();
    this.statuses = this.projectService.getProjectStatuses();
  }

  initForm(): void {
    this.projectForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      netIncomeLastYear: ['', Validators.required],
      address: ['', Validators.required],
      goalAmount: ['', Validators.required],
      deadline: [''],
      equityOffered: ['', Validators.required],
      dividendPayoutRatio: ['', Validators.required],
      totalInvestment: ['', Validators.required],
      projectCategory: ['', Validators.required],
      projectStatus: ['', Validators.required],
      imageUrl: [null]
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      // Create FormData object
      const formData = new FormData();
      // Append form values to FormData
      Object.keys(this.projectForm.value).forEach(key => {
        formData.append(key, this.projectForm.value[key]);
      });
      // Append image file to FormData
      const imageFile = this.projectForm.get('imageUrl')!.value;
      formData.append('imageUrl', imageFile);

      // Call projectService method to create project
      this.projectService.createProject(formData).subscribe(
        (project: Project) => {
          console.log('Project created successfully:', project);
          this.successAlert();
          // Optionally, redirect or show success message
        },
        error => {
          console.error('Error creating project:', error);
          this.failedAlert();
          // Handle error
        }
      );
    }
  }
  @ViewChild('closeModal', { static: false }) closeModal: any;
  successAlert(){
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "your investment has been created",
      showConfirmButton: false,
      timer: 1500
      
    }).then(() => {
      this.closeModal.nativeElement.click();
    });
    
  }

  failedAlert(){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }


  onFileChange(event: any) {
    const file = event.target.files[0];
    this.projectForm.patchValue({
      imageUrl: file
    });
    this.projectForm.get('imageUrl')!.updateValueAndValidity();
  }
}
  