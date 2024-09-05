import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ui';
  constructor(private router: Router, private _snackBar: MatSnackBar, private authService: AuthService) {
    if (authService.isAuthenticated()) {
      authService.me().pipe(catchError((error: HttpErrorResponse) => {
        authService.logout()
        return throwError(() => error);
      })).subscribe(() => {
        router.navigateByUrl('/home')
      })
    }
  }
}
