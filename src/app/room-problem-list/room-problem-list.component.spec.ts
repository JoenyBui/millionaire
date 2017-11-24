import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomProblemListComponent } from './room-problem-list.component';

describe('RoomProblemListComponent', () => {
  let component: RoomProblemListComponent;
  let fixture: ComponentFixture<RoomProblemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomProblemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomProblemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
