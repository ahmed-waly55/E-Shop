import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private _messageService: MessageService) { }
  showSuccess(sumary: string, detail: string) {
    this._messageService.add({ severity: "success", summary: sumary, detail: detail })
  }
  showInfo(sumary: string, detail: string) {
    this._messageService.add({ severity: "info", summary: sumary, detail: detail })
  }
  showWarn(sumary: string, detail: string) {
    this._messageService.add({ severity: "warn", summary: sumary, detail: detail })
  }
  showError(sumary: string, detail: string) {
    this._messageService.add({ severity: "error", summary: sumary, detail: detail })
  }
}
