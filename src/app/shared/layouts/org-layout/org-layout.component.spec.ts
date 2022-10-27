import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgLayoutComponent } from './org-layout.component';

describe('OrgLayoutComponent', () => {
  let component: OrgLayoutComponent;
  let fixture: ComponentFixture<OrgLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
