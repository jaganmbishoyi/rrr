import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualUserRegisterComponent } from './individual-user-register.component';

describe('IndividualUserRegisterComponent', () => {
  let component: IndividualUserRegisterComponent;
  let fixture: ComponentFixture<IndividualUserRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualUserRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualUserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
