import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  id: number = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}


  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.id = id;
  }

}
