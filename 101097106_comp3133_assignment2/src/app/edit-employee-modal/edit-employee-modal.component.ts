import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-edit-employee-modal',
  templateUrl: './edit-employee-modal.component.html',
  styleUrls: ['./edit-employee-modal.component.css'],
  imports: [FormsModule],
  standalone: true
})
export class EditEmployeeModalComponent {
  editableEmployee: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditEmployeeModalComponent>,
    private apollo: Apollo
  ) {
    this.editableEmployee = { ...data.employee }; 
  }

  updateEmployee() {
    const UPDATE_EMPLOYEE = gql`
      mutation UpdateEmployee($id: ID!, $firstname: String!, $lastname: String!, $email: String!) {
        updateEmployee(id: $id, firstname: $firstname, lastname: $lastname, email: $email) {
          id
          firstname
          lastname
          email
        }
      }
    `;

    this.apollo.mutate({
      mutation: UPDATE_EMPLOYEE,
      variables: {
        id: this.editableEmployee.id,
        firstname: this.editableEmployee.firstname,
        lastname: this.editableEmployee.lastname,
        email: this.editableEmployee.email
      }
    }).subscribe({
      next: (result: any) => {
        console.log('Updated Employee:', result.data.updateEmployee);
        this.dialogRef.close(result.data.updateEmployee); 
      },
      error: (error) => {
        console.error('Error updating employee:', error);
        alert('Failed to update employee.');
      }
    });
  }

  close() {
    console.log('Edit modal closed without changes');
    this.dialogRef.close(null); 
  }
}