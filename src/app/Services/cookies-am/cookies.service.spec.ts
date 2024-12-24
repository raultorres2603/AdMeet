import {TestBed} from '@angular/core/testing';

import {CookiesAmService} from './cookies.service';

describe('CookiesService', () => {
  let service: CookiesAmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookiesAmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
