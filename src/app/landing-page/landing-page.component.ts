import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {PlayerComponent} from '../player/player.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
  }

  showModeratorView() {
    this.router.navigate(['/moderator'])
    // console.log("Moderator View");
  }

  showPlayerView() {
    this.router.navigate(['/player']);
    // console.log("Player View");
  }
}
