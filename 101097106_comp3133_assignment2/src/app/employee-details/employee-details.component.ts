import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-employee-details',
  imports: [],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css',
  standalone: true
})
export class EmployeeDetailsComponent implements OnInit {
  employee: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const employeeId = this.route.snapshot.paramMap.get('id') ?? '';
    this.fetchEmployeeDetails(employeeId);
  }

  fetchEmployeeDetails(id: string) {
    const query = `
      query {
      employee(id: "${id}") {
        id
        firstname
        lastname
        email
        department
      }
    }
  `;

  this.http.post('http://localhost:4000/graphql', { query })
    .subscribe((response: any) => {
      this.employee = response.data.employee;
    }, (error) => {
      console.error('Failed to fetch employee details:', error);
      alert('Error fetching employee details.');
    });
  }
}