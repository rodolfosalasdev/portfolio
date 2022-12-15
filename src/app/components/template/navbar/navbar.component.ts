import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public nameNavebar: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  public nameNavebarChange() {
    this.nameNavebar = !this.nameNavebar;
  }

}
