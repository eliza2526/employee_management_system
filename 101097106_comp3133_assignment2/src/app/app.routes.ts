import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AuthGuard } from './auth.guard';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard] },
    { path: 'employee-details/:id', component: EmployeeDetailsComponent},
    { path: 'add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard] },
];
