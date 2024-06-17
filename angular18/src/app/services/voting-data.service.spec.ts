import { TestBed } from '@angular/core/testing';

import { VotingDataService } from '../voting-data.service';

describe('VotingDataService', () => {
  let service: VotingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VotingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
