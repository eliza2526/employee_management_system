import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, HttpClientModule ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  standalone: true
})
export class SignupComponent {

  username: string = '';
  email: string='';
  password: string='';

  constructor(private http: HttpClient) { }

  onSignup() {
    const signupMutation = `
    mutation {
    signup(username: "${this.username}", email: "${this.email}", password: "${this.password}") {
      id
      username
      email
      }
    }
  `;

  this.http.post('http://localhost:4000/graphql', { query: signupMutation })
    .subscribe((response: any) => {
      console.log('Signup Succesful: ', response);
      alert('Signup Succesful! Welcome!' + response.data.signup.username )
    }, error => {
      console.error('Signup failed: ', error);
    });
  }
}