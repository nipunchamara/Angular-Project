import { Component } from '@angular/core';
import {
  StudentResponse,
  StudentService,
} from '../../Services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent {
  filteredStudents: any;
  searchQuery: string = '';  // Initialize searchQuery to an empty string

  constructor(private studentService: StudentService) {}

  students!: StudentResponse[];
  isLoading: boolean = false;

  ngOnInit() {
    this.getStudentLists();
  }

  getStudentLists() {
    this.isLoading = true;
    this.studentService.getStudents().subscribe((res) => {
      console.log(res.student);
      this.students = res.student;
      this.filteredStudents = res.student;  // Initialize filteredStudents with fetched data
      this.isLoading = false;
    });
  }

  searchStudents() {
    if (this.searchQuery.trim() === '') {
      this.filteredStudents = this.students;  // Show all students if search is empty
    } else {
      this.filteredStudents = this.students.filter((student) =>
        student.name.toLowerCase().includes(this.searchQuery.toLowerCase())  // Filter by name
      );
    }
  }

  deleteStudent(event: any, studentId: Number) {
    if (confirm('Are you sure ?')) {
      event.target.innerText = 'Deleting...';

      this.studentService.destroyStudent(studentId).subscribe((res: any) => {
        this.getStudentLists();
        alert(res.message);
      });
    }
  }

  fetchStudentDetails(studentId: number) {
    this.studentService.getStudentDetails(studentId).subscribe((details: any) => {
      console.log(details);  // Handle student details
    });
  }
}


// import { Component, OnInit } from '@angular/core';
// import { StudentService } from '../services/student.service';

// @Component({
//   selector: 'app-students',
//   templateUrl: './students.component.html',
//   styleUrls: ['./students.component.css']
// })
// export class StudentsComponent implements OnInit {

//   students: any[] = [];
//   filteredStudents: any[] = [];
//   searchQuery: string = '';
//   isLoading: boolean = true;

//   constructor(private studentService: StudentService) { }

//   ngOnInit(): void {
//     this.loadStudents();
//   }

//   loadStudents(): void {
//     this.studentService.getStudents().subscribe((data: any[]) => {
//       this.students = data;
//       this.filteredStudents = data;
//       this.isLoading = false;
//     });
//   }

//   searchStudents(): void {
//     this.filteredStudents = this.students.filter(student =>
//       student.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
//       student.address.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
//       student.phone.includes(this.searchQuery) ||
//       student.parent.toLowerCase().includes(this.searchQuery.toLowerCase())
//     );
//   }

//   fetchStudentDetails(id: number): void {
//     console.log("Fetching details for student ID:", id);
//     // You can expand this function to display student details in a modal.
//   }

//   deleteStudent(event: Event, id: number): void {
//     event.preventDefault();
//     if (confirm("Are you sure you want to delete this student?")) {
//       this.studentService.deleteStudent(id).subscribe(() => {
//         this.students = this.students.filter(student => student.id !== id);
//         this.filteredStudents = this.filteredStudents.filter(student => student.id !== id);
//       });
//     }
//   }
// }
