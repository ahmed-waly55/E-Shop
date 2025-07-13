import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { myDetailsResolver } from './my-details.resolver';

describe('myDetailsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => myDetailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
