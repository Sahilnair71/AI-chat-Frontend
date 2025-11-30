import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSelectorsDialogboxComponent } from './mobile-selectors-dialogbox.component';

describe('MobileSelectorsDialogboxComponent', () => {
  let component: MobileSelectorsDialogboxComponent;
  let fixture: ComponentFixture<MobileSelectorsDialogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSelectorsDialogboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileSelectorsDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
