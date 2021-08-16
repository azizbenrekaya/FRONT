import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertclientComponent } from './alertclient.component';

describe('AlertclientComponent', () => {
  let component: AlertclientComponent;
  let fixture: ComponentFixture<AlertclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertclientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
