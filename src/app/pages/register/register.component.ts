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


@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService]
})
export class RegisterComponent {

  name!:FormControl
  email!:FormControl
  password!:FormControl
  rePassword!:FormControl

  registrationForm!:FormGroup

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




  submit(){
    if(this.registrationForm.valid){
      this.siginUp(this.registrationForm.value)
      
    }else{
      this.registrationForm.markAllAsTouched()
      Object.keys(this.registrationForm.controls).forEach((control)=> this.registrationForm.controls[control]
      .markAsDirty())
    }
    
  }

  siginUp(data:IRegister):void{
    this._NgxSpinnerService.show()
    this._authService.register(data).subscribe({
      next: (response) =>{
        if(response._id){
          this.show('success','Success','Success Registration ')

        }
        this._NgxSpinnerService.hide()
        this.router.navigate(['auth/login']);
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
