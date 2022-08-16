import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import * as AOS from "aos";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [fadeInOnEnterAnimation({ duration: 1000, delay: 500 }), fadeOutOnLeaveAnimation()]
})
export class NavbarComponent implements OnInit {
  public isMenuShown: boolean = false;

  constructor(private location: Location) { }

  ngOnInit(): void {
    AOS.init();
  }

  onXta5yClicked() {
    this.location.replaceState("/#home");
  }

  onAboutMeClicked() {
    this.location.replaceState("/#about");
  }

  onWorksClicked() {
    this.location.replaceState("/#works");
  }

  onContactsClicked() {
    this.location.replaceState("/#contacts");
  }
}
