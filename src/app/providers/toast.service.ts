import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastOptions: any;

  constructor(public toastController: ToastController) { }

  async present(message: string, duration: number, showCancelButton: boolean) {
    if (showCancelButton) {
      this.toastOptions = {
        message,
        duration,
        position: 'bottom',
        color: 'dark',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            handler: () => {

            }
          }
        ]
      };
    } else {
      this.toastOptions = {
        message,
        duration,
        position: 'bottom',
        color: 'dark'
      };
    }

    const toast = await this.toastController.create(this.toastOptions);
    toast.present();
  }

}
