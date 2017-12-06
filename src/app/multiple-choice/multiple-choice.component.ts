import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.css']
})
export class MultipleChoiceComponent implements OnInit {
  @Input() items: Array<any>;
  @Output() onAnswer = new EventEmitter <any>();

  constructor() { }

  ngOnInit() {
  }

  clickItem(item) {
    this.onAnswer.emit(item);
  }
}
