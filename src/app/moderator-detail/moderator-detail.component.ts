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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}


  ngOnInit(): void {
    // this.route.paramMap
  }
}
