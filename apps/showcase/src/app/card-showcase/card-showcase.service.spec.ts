import { TestBed } from '@angular/core/testing';

import { CardShowcaseService } from './card-showcase.service';

describe('CardShowcaseService', () => {
  let service: CardShowcaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardShowcaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
