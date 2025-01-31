import { Component } from '@angular/core';
import { StudentService } from '../../Services/student.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrl: './student-create.component.css',
})
export class StudentCreateComponent {
  constructor(private studentService: StudentService) { }

  name!: string;
  address!: string;
  phone!: string;
  parent!: string;

  isLoading: boolean = false;
  loadingTitle: string = 'Loading';

  errors: any = [];

  saveStudent() {
    this.isLoading = true;
    this.loadingTitle = 'Saving';
    var inputData = {
      name: this.name,
      address: this.address,
      phone: this.phone,
      parent: this.parent
    };

    this.studentService.saveStudent(inputData).subscribe({
      next: (res: any) => {
        console.log(res, 'response');
        alert(res.message);
        this.name = '';
        this.address = '';
        this.phone = '';
        this.parent = '';
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errors = err.error.message;
        this.isLoading = false;
        console.log(err.error.message, 'error');
      },
    });
  }
}
