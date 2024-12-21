import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioToSearchComponent } from './radio-to-search.component';

describe('RadioToSearchComponent', () => {
  let component: RadioToSearchComponent;
  let fixture: ComponentFixture<RadioToSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioToSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioToSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
