import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditEmployeeModalComponent } from '../edit-employee-modal/edit-employee-modal.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment'; 

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
  standalone: true,
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];

  constructor(
    private apollo: Apollo,
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  fetchEmployees(): void {
    const GET_EMPLOYEES = gql`
      query GetAllEmployees {
        employees {
          id
          firstname
          lastname
          email
        }
      }
    `;

    this.apollo
      .watchQuery<any>({ query: GET_EMPLOYEES })
      .valueChanges.subscribe(({ data }) => {
        this.employees = data?.employees || [];
        console.log('Fetched Employees:', this.employees); 
      });
  }

  viewEmployee(employee: any): void {
    this.router.navigate(['/employee-details', employee.id]);
  }

  editEmployee(employee: any): void {
    const editableCopy = JSON.parse(JSON.stringify(employee)); 

    const dialogRef = this.dialog.open(EditEmployeeModalComponent, {
      width: '400px',
      data: { employee: editableCopy },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Updated Employee:', result);
        this.loadEmployees(); 
      }
    });
  }
  
  loadEmployees(): void {
    const query = `
      query {
        employees {
          id
          firstname
          lastname
          email
        }
      }
    `;

    this.http.post(environment.apiUrl, { query }).subscribe(
      (response: any) => {
        this.employees = response.data.employees || [];
        console.log('Employees List (Latest):', this.employees); // Debug updated list
      },
      (error) => {
        console.error('Error loading employees:', error);
        alert('Failed to load employees.');
      }
    );
  }

  navigateToAddEmployee(): void {
    console.log('Navigating to Add Employee...');
    this.router.navigate(['/add-employee']);
  }  
  
  deleteEmployee(employeeId: string): void {
    const DELETE_EMPLOYEE = gql`
      mutation DeleteEmployee($id: ID!) {
        deleteEmployee(id: $id)
      }
    `;
  
    this.apollo.mutate({
      mutation: DELETE_EMPLOYEE,
      variables: { id: employeeId }
    }).subscribe({
      next: () => {
        console.log('Employee deleted successfully');
        this.loadEmployees(); 
      },
      error: (error) => {
        console.error('Error deleting employee:', error);
        alert('Failed to delete employee.');
      }
    });
  }

  searchQuery: string = '';

get filteredEmployees() {
  return this.employees.filter(employee =>
    employee.firstname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
    employee.lastname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  } 
}