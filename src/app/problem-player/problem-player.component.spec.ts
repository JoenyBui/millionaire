import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemPlayerComponent } from './problem-player.component';

describe('ProblemPlayerComponent', () => {
  let component: ProblemPlayerComponent;
  let fixture: ComponentFixture<ProblemPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
