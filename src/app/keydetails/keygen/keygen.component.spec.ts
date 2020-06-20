import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeygenComponent } from './keygen.component';

describe('KeygenComponent', () => {
  let component: KeygenComponent;
  let fixture: ComponentFixture<KeygenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeygenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeygenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
