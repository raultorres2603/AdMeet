import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniTitleComponent } from './ini-title.component';

describe('IniTitleComponent', () => {
  let component: IniTitleComponent;
  let fixture: ComponentFixture<IniTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IniTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
