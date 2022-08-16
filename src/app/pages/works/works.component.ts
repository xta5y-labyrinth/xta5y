import { Component, OnInit } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import * as AOS from "aos";


@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss'],
  animations: [
    fadeInOnEnterAnimation({ duration: 1000, delay: 1000 }),
    fadeOutOnLeaveAnimation()
  ]
})
export class WorksComponent implements OnInit {
  worksCounter = 0;
  worksCount = 2;

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

  onLeftArrowClick() {
    const newCounter = this.worksCounter - 1;

    if (newCounter >= 0) {
      this.worksCounter = newCounter;
    }
  }

  onRightArrowClick() {
    const newCounter = this.worksCounter + 1;

    if (newCounter <= this.worksCount - 1) {
      this.worksCounter = newCounter;
    }
  }
}
