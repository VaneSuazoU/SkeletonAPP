import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importa Router
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  username: string = '';
  nombre: string = '';
  apellido: string = '';
  nivelEducacion: string = '';
  fechaNacimiento: Date | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Inyecta Router
    private animationCtrl: AnimationController
  ) {
    // Verificar si hay datos en el estado de la navegación
    this.route.queryParams.subscribe(params => {
      if (params && params['username']) { // Verifica que params y username existan
        this.username = params['username'];

      }
    });
  }

  mostrar() {
    alert(`Nombre: ${this.nombre}, Apellido: ${this.apellido}`);
  }

  limpiar() {
    // Limpiar campos
    this.nombre = '';
    this.apellido = '';
    this.nivelEducacion = '';
    this.fechaNacimiento = null;

    // Animaciones
    const nombreInput = document.querySelector('ion-input[name="nombre"]');
    const apellidoInput = document.querySelector('ion-input[name="apellido"]');

    if (nombreInput && apellidoInput) {
      const animation = this.animationCtrl.create()
        .addElement(nombreInput)
        .duration(1000)
        .iterations(1)
        .fromTo('transform', 'translateX(0px)', 'translateX(100px)');

      const animation2 = this.animationCtrl.create()
        .addElement(apellidoInput)
        .duration(1000)
        .iterations(1)
        .fromTo('transform', 'translateX(0px)', 'translateX(100px)');

      animation.play();
      animation2.play();
    }
  }
}