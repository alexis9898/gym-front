import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../Module/material.module';
import { RouterOutlet } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @ViewChild('snav') sidenav!: MatSidenav;

  onToggleSidenav() {
    this.sidenav.toggle();
  }
}
