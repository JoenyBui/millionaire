import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-moderator-detail',
  templateUrl: './moderator-detail.component.html',
  styleUrls: ['./moderator-detail.component.css']
})
export class ModeratorDetailComponent implements OnInit {
  name: number = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}


  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    // this.route.paramMap
    this.name = id;
  }
}
