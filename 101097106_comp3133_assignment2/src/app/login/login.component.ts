import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [ FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true
})
export class LoginComponent {
  username: string = '';
  password: string='';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const loginQuery = `
      query {
        login(username: "${this.username}", password: "${this.password}") {
          id
          username
          email
        }
      }
    `;

    this.http.post(environment.apiUrl, { query: loginQuery })
      .subscribe((response: any) => {
        console.log('Login Succesful:', response);
        localStorage.setItem('authToken', response.data.login.id);
        this.router.navigate(['/employees']);
      }, error => {
          console.error('Login Failed: ', error);
          alert('Invalid Username or Password');
      });
  }
}
