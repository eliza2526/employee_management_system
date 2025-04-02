import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, RouterModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent { 

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    localStorage.removeItem('authToken')
    this.router.navigate(['/login']);
    alert('You have succesfully logged out!');
  }
}
