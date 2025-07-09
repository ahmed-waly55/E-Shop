import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../core/service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ILogin } from '../../core/interfaces/ilogin';
import { SharedModule } from '../../shared/module/shared/shared.module';
import { UserDataService } from '../../core/service/user-data.service';
import { NotificationsService } from '../../core/service/notifications.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  email!: FormControl;
  password!: FormControl;

  loginForm!: FormGroup;

  constructor(
    private _authService: AuthService,
    private _notificationsService: NotificationsService,
    private router: Router,
    private userData: UserDataService
  ) {
    this.initFormControls();
    this.initFormGroupe();
  }

  initFormControls(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
  }

  initFormGroupe(): void {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.siginIn(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
      Object.keys(this.loginForm.controls).forEach((control) =>
        this.loginForm.controls[control].markAsDirty()
      );
    }
  }

  siginIn(data: ILogin): void {
    this._authService.login(data).subscribe({
      next: (response) => {
        if (response._id) {
          this._notificationsService.showSuccess('Success', 'Success Login ');
          localStorage.setItem('token', response._id);

          this.userData.username.next(response.name);
          localStorage.setItem('username', response.name);
        }
        this.router.navigate(['user']);
      },
      error: (err) => {
        this._notificationsService.showError('Error', err.error.error);
      },
    });
  }


}
