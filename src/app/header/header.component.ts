import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchId: number;

  constructor(private router: Router) { }

  onSearch() {
    if (this.searchId) {
      this.router.navigate(['/user', this.searchId]);
    }
  }
}
