import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeydetailsComponent } from './keydetails.component';

describe('KeydetailsComponent', () => {
  let component: KeydetailsComponent;
  let fixture: ComponentFixture<KeydetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeydetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
