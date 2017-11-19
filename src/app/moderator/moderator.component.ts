import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material';
import { Moderator} from '../moderator';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-host',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css'],
})
export class ModeratorComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
  }

  createNewRoom() {
    this.router.navigate(['/moderator-room'])
  }
}
