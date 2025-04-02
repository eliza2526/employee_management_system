import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  imports: [FormsModule],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  standalone: true,
})
export class AddEmployeeComponent {
  employee = {
    firstname: '',
    lastname: '',
    email: '',
    gender: '',
    city: '',
    designation: '',
    department: '',
    salary: null,
  };

  constructor(private apollo: Apollo, private router: Router) {}

  onSubmit() {
    const ADD_EMPLOYEE = gql`
      mutation AddEmployee(
        $firstname: String!,
        $lastname: String!,
        $email: String!,
        $gender: String!,
        $city: String!,
        $designation: String!,
        $department: String!,
        $salary: Float!
      ) {
        addEmployee(
          firstname: $firstname,
          lastname: $lastname,
          email: $email,
          gender: $gender,
          city: $city,
          designation: $designation,
          department: $department,
          salary: $salary
        ) {
          id
          firstname
        }
      }
    `;

    this.apollo.mutate({
      mutation: ADD_EMPLOYEE,
      variables: this.employee,
    }).subscribe({
      next: (response) => {
        console.log('Employee added:', response);
        alert('Employee added successfully!');
        this.router.navigate(['/employees']);
      },
      error: (error) => {
        console.error('Error adding employee:', error);
        alert('Failed to add employee. Please try again.');
      },
    });
  }
}