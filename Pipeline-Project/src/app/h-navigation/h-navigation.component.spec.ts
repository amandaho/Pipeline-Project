import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HNavigationComponent } from './h-navigation.component';

describe('HNavigationComponent', () => {
  let component: HNavigationComponent;
  let fixture: ComponentFixture<HNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
