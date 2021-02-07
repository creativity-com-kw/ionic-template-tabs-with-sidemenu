import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(public loadingController: LoadingController) { }

  async present() {
    const loading = await this.loadingController.create({
      backdropDismiss: false
    });

    return await loading.present();
  }

  dismiss() {
    this.loadingController.dismiss();
  }
}
