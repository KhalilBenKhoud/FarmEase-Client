import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectCategory } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit{
  projectForm: FormGroup;
  projectCategories: ProjectCategory[] = [
    ProjectCategory.FARM,
    ProjectCategory.FISHING_BOAT
  ];

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      netIncomeLastYear: ['', Validators.required],
      address: ['', Validators.required],
      goalAmount: ['', Validators.required],
      //deadline: ['', Validators.required],
      equityOffered: ['', Validators.required],
      dividendPayoutRatio: ['', Validators.required],
      totalInvestment: ['', Validators.required],
      projectCategory: ['', Validators.required]
    });
  }

  handleImageUpload(event: any) {
    const file = event.target.files[0];
    this.projectForm.patchValue({ imageFile: file });
    console.log(event)
  }

  createProject() {
    const projectData = this.projectForm.value;
  const headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });

  this.projectService.createProject(projectData, projectData.imageFile)
    .subscribe(createdProject => {
      console.log("Project created");
      this.successAlert();
    }, error => {
      console.log("Error creating project");
      this.failedAlert();
    });
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

}
