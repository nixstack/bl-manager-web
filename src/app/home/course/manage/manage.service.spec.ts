import { TestBed } from '@angular/core/testing';

import { ManageService } from './manage.service';

describe('MineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageService = TestBed.get(ManageService);
    expect(service).toBeTruthy();
  });
});
