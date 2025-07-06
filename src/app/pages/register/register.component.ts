import { Component, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';
import { IRegister } from '../../core/interfaces/iregister';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/module/shared/shared.module';
import { UserDataService } from '../../core/service/user-data.service';
import { NotificationsService } from '../../core/service/notifications.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {
  name!: FormControl;
  email!: FormControl;
  password!: FormControl;
  rePassword!: FormControl;
  registrationForm!: FormGroup;

  isRegisterd: boolean = false

  constructor(
    private _authService: AuthService,
    private _notificationsService: NotificationsService,
    private _NgxSpinnerService: NgxSpinnerService,
    private router: Router,
    private userData: UserDataService
  ) {
    this.initFormControls();
    this.initFormGroupe();
  }

  initFormControls(): void {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
    this.rePassword = new FormControl('', [
      Validators.required,
      this.passwordMatch(this.password),
    ]);
  }

  initFormGroupe(): void {
    this.registrationForm = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
      rePassword: this.rePassword,
    });
  }

  passwordMatch(pass: AbstractControl): ValidatorFn {
    return (rePass: AbstractControl): null | { [key: string]: boolean } => {
      if (pass.value !== rePass.value || rePass.value === '') {
        return { passNotMatch: true };
      } else return null;
    };
  }

  submit() {
    if (this.registrationForm.valid) {
      this.siginUp(this.registrationForm.value);
      this.isRegisterd = true
      localStorage.removeItem("cartState")  // enhance remove all cart
    } else {
      this.registrationForm.markAllAsTouched();
      Object.keys(this.registrationForm.controls).forEach((control) =>
        this.registrationForm.controls[control].markAsDirty()
      );
    }
  }

  siginUp(data: IRegister): void {
    this._NgxSpinnerService.show();
    this._authService.register(data).subscribe({
      next: (response) => {
        if (response._id) {
          const { email, password } = data;
          this._notificationsService.showSuccess('Success', 'Success Registration ');
          this._authService.login({ email, password }).subscribe(() => {
            localStorage.setItem('token', response._id);
            this.router.navigate(['user']);
            this.userData.username.next(response.name);
            localStorage.setItem('username', response.name);
          });
        }
        this._NgxSpinnerService.hide();
        // this.router.navigate(['auth/login']);
      },
      error: (err) => {
        this._notificationsService.showError('Error', err.error.error);
        this._NgxSpinnerService.hide();
      },
    });
  }


}
