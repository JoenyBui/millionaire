import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemModeratorComponent } from './problem-moderator.component';

describe('ProblemModeratorComponent', () => {
  let component: ProblemModeratorComponent;
  let fixture: ComponentFixture<ProblemModeratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemModeratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
