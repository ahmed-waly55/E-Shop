import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { MessageService } from 'primeng/api';
import { AutoFocusModule } from 'primeng/autofocus';

@NgModule({
  declarations: [

  ],
  imports: [
    FormsModule,
    InputGroupModule,
    InputTextModule,
    InputGroupAddonModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
    MessagesModule,
    NgxSpinnerModule,
    AutoFocusModule
  ],
  exports: [
    FormsModule,
    InputGroupModule,
    InputTextModule,
    InputGroupAddonModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
    MessagesModule,
    NgxSpinnerModule,
    AutoFocusModule
  ],
  providers: [MessageService]
})
export class SharedModule { }
