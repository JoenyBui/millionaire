import { TestBed, inject } from '@angular/core/testing';

import { ModeratorService } from './moderator.service';

describe('ModeratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModeratorService]
    });
  });

  it('should be created', inject([ModeratorService], (service: ModeratorService) => {
    expect(service).toBeTruthy();
  }));
});
