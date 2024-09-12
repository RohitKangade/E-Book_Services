import { TestBed } from '@angular/core/testing';

import { EntryBookService } from './entry-book.service';

describe('EntryBookService', () => {
  let service: EntryBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
