import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyregistrationformComponent } from './keyregistrationform.component';

describe('KeyregistrationformComponent', () => {
  let component: KeyregistrationformComponent;
  let fixture: ComponentFixture<KeyregistrationformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyregistrationformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyregistrationformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
