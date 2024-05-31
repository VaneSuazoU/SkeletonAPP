import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public selectedPath = '';

  public pages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Perfil', url: '/profile', icon: 'person' },
    { title: 'Itinerarios', url: '/itineraries', icon: 'map' },
    { title: 'Destinos', url: '/destinations', icon: 'location' },
  ];

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.selectedPath = this.router.url;
    });
  }
}