import { Component } from '@angular/core';
import { MaterialModule } from '../../Module/material.module';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {


}
