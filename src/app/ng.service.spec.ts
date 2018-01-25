import { TestBed, inject } from '@angular/core/testing';

import { NgService } from './ng.service';

describe('NgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgService]
    });
  });

  it('should be created', inject([NgService], (service: NgService) => {
    expect(service).toBeTruthy();
  }));
});
