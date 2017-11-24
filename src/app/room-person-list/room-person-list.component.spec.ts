import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomPersonListComponent } from './room-person-list.component';

describe('RoomPersonListComponent', () => {
  let component: RoomPersonListComponent;
  let fixture: ComponentFixture<RoomPersonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomPersonListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomPersonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
