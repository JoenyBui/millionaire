import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}


  ngOnInit() {
  }

  joinGameRoom() {
    this.router.navigate(['/player-room/'])
  }
}
