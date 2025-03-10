import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { Message, MessageService } from 'primeng/api';
import { AuthService } from '../../core/service/auth.service';
import { IRegister } from '../../core/interfaces/iregister';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { ILogin } from '../../core/interfaces/ilogin';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
     FormsModule,
         InputGroupModule,
          InputGroupAddonModule,
           InputTextModule,
           ReactiveFormsModule,
           ButtonModule,
           MessagesModule,
           ToastModule,
           NgxSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]

})
export class LoginComponent {
  email!:FormControl
  password!:FormControl

  loginForm!:FormGroup

  constructor(
    private _authService:AuthService,
    private _MessageService:MessageService,
    private _NgxSpinnerService: NgxSpinnerService,
    private router:Router
  ){
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




  submit(){
    if(this.loginForm.valid){
      this.siginIn(this.loginForm.value)
      
    }else{
      this.loginForm.markAllAsTouched()
      Object.keys(this.loginForm.controls).forEach((control)=> this.loginForm.controls[control]
      .markAsDirty())
    }
    
  }

  siginIn(data:ILogin):void{
    this._NgxSpinnerService.show()
    this._authService.login(data).subscribe({
      next: (response) =>{
        if(response._id){
          this.show('success','Success','Success Login ')

        }
        this._NgxSpinnerService.hide()
        this.router.navigate(['user']);
      },
      error: (err) =>{
        this.show('error','Error',err.error.error)
        this._NgxSpinnerService.hide()
      },

    })
  }

  show(severity:string,summary:string,detail:string) {
    this._MessageService.add({ severity: severity, summary: summary, detail: detail });
}

}
