import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  goToSearch() {
    // Itt átirányíthatod a felhasználót a kereső oldalra (például router segítségével)
    window.location.href = '/search'; // Az URL itt a te keresőoldalad URL-je legyen.
  }
}