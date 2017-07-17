import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VNagivationComponent } from './v-nagivation.component';

describe('VNagivationComponent', () => {
  let component: VNagivationComponent;
  let fixture: ComponentFixture<VNagivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VNagivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VNagivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
