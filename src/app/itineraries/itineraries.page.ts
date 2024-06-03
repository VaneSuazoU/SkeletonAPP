import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-itineraries',
  templateUrl: './itineraries.page.html',
  styleUrls: ['./itineraries.page.scss'],
})
export class ItinerariesPage {
  constructor(private router: Router) {}
}