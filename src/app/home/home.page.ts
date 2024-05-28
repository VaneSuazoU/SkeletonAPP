import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, keyframes, style, AnimationBuilder } from '@angular/animations';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data: any;
  nombre: string = '';
  apellido: string = '';
  nivelEducacion: string = '';
  fechaNacimiento: Date = new Date();

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    @Inject(ANIMATION_MODULE_TYPE) private animationBuilder: AnimationBuilder,
    private alertController: AlertController
  ) {
    this.activeroute.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras.state) {
        this.data = navigation.extras.state['user'];
        console.log(this.data);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  limpiar() {
    this.nombre = '';
    this.apellido = '';

    const animationName = this.animationBuilder.build([
      animate('1s', keyframes([
        style({ transform: 'translateX(0)' }),
        style({ transform: 'translateX(100%)' }),
        style({ transform: 'translateX(0)' })
      ]))
    ]);

    const animationApellido = this.animationBuilder.build([
      animate('1s', keyframes([
        style({ transform: 'translateX(0)' }),
        style({ transform: 'translateX(100%)' }),
        style({ transform: 'translateX(0)' })
      ]))
    ]);

    const elementName = document.querySelector('ion-input[name="nombre"]');
    const elementApellido = document.querySelector('ion-input[name="apellido"]');

    if (elementName && elementApellido) {
      const playerName = animationName.create(elementName);
      const playerApellido = animationApellido.create(elementApellido);
      playerName.play();
      playerApellido.play();
    }
  }

  async mostrar() {
    const alert = await this.alertController.create({
      header: 'Información',
      message: `Su nombre es: ${this.nombre} ${this.apellido}`,
      buttons: ['OK']
    });

    await alert.present();
  }
}