import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as AOS from "aos";
import { Location } from '@angular/common';

@Component({
  selector: 'app-xta5y',
  templateUrl: './xta5y.component.html',
  styleUrls: ['./xta5y.component.scss']
})
export class Xta5yComponent implements OnInit {

  @ViewChild('home') home!: ElementRef<HTMLDivElement>;
  @ViewChild('about_me') aboutMe!: ElementRef<HTMLDivElement>;
  @ViewChild('works') works!: ElementRef<HTMLDivElement>;
  @ViewChild('contacts') contacts!: ElementRef<HTMLDivElement>;

  pageNumber = 0;
  maxPageNumber = 3;
  isScrolling: boolean = false;

  page = "home";
  lastY: number = 0;

  constructor(private route: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit() {
    AOS.init();

    window.addEventListener('wheel', this.onWheelEvent, true);
    window.addEventListener('touchstart', this.onTouchStartEvent, true);

    window.addEventListener('touchmove', this.onTouchMoveEvent, true);
  }

  ngAfterViewInit(): void {
    const url = this.router.routerState.snapshot.url;
    this.onUrlChange("#" + url);

    this.location.onUrlChange((url: string) => {
      this.onUrlChange(url);
    });
  }

  ngOnDestroy() {
    window.removeEventListener('wheel', this.onWheelEvent, true);
    window.removeEventListener('touchstart', this.onTouchStartEvent, true);
    window.removeEventListener('touchmove', this.onTouchMoveEvent, true);
  }

  onTouchStartEvent = (event: TouchEvent): void => {
    this.lastY = event.touches[0].clientY;
  }

  onTouchMoveEvent = (event: TouchEvent): void => {
    if (this.isScrolling) {
      return;
    }

    this.isScrolling = true;

    console.log("touchmove");
    var currentY = event.touches[0].clientY;
    if (currentY < this.lastY) {
      this.pageNumber += 1;

      if (this.pageNumber > this.maxPageNumber) {
        this.pageNumber = this.maxPageNumber;
      }
    } else if (currentY > this.lastY) {
      this.pageNumber -= 1;

      if (this.pageNumber < 0) {
        this.pageNumber = 0;
      }
    }

    this.onPageChange(this.pageNumber);
  }

  onWheelEvent = (event: WheelEvent): void => {
    if (this.isScrolling) {
      return;
    }

    this.isScrolling = true;

    if (event.deltaY > 0) {
      this.pageNumber += 1;

      if (this.pageNumber > this.maxPageNumber) {
        this.pageNumber = this.maxPageNumber;
      }
    } else if (event.deltaY < 0) {
      this.pageNumber -= 1;

      if (this.pageNumber < 0) {
        this.pageNumber = 0;
      }
    }

    this.onPageChange(this.pageNumber);
  };

  onPageChange(pageNumber: number) {
    switch (this.pageNumber) {
      case 0:
        this.location.replaceState("/#home");
        break;
      case 1:
        this.location.replaceState("/#about");
        break;
      case 2:
        this.location.replaceState("/#works");
        break;
      case 3:
        this.location.replaceState("/#contacts");
        break;
    }
  }

  onUrlChange(url: string) {
    const page = url.match(/#[a-z]+/gi);

    if (page && page[0]) {
      this.page = page[0];
    }

    switch (this.page) {
      case "#home":
        this.pageNumber = 0;
        break;
      case "#about":
        this.pageNumber = 1;
        break;
      case "#works":
        this.pageNumber = 2;
        break;
      case "#contacts":
        this.pageNumber = 3;
        break;
      default:
        this.pageNumber = 0;
        break;
    }

    this.smoothScrollTo(0, this.getPageOffsetTop(this.pageNumber), 1200);
  }

  getPageOffsetTop(pageNumber: number): number {
    switch (pageNumber) {
      case 0:
        return this.home.nativeElement.offsetTop;
      case 1:
        return this.aboutMe.nativeElement.offsetTop;
      case 2:
        return this.works.nativeElement.offsetTop;
      case 3:
        return this.contacts.nativeElement.offsetTop;
      default:
        return this.home.nativeElement.offsetTop;
    }
  }

  smoothScrollTo = (endX: number, endY: number, duration: number) => {
    let startX = window.scrollX || window.pageXOffset,
      startY = window.scrollY || window.pageYOffset,
      distanceX = endX - startX,
      distanceY = endY - startY,
      startTime = new Date().getTime();

    // Easing function
    let easeInOutQuart = function (time: number, from: number, distance: number, duration: number) {
      if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
      return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    };

    const component = this;

    let timer = window.setInterval(function () {
      let time = new Date().getTime() - startTime,
        newX = easeInOutQuart(time, startX, distanceX, duration),
        newY = easeInOutQuart(time, startY, distanceY, duration);
      if (time >= duration) {
        window.scrollTo(endX, endY);
        window.clearInterval(timer);
        component.isScrolling = false;
      }
      window.scrollTo(newX, newY);
    }, 1000 / 60); // 60 fps
  }
}
