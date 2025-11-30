import { TestBed } from '@angular/core/testing';

import { ReplyMockApiService } from './reply-mock-api.service';

describe('ReplyMockApiService', () => {
  let service: ReplyMockApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReplyMockApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
