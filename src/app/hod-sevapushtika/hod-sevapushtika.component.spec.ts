import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodSevapushtikaComponent } from './hod-sevapushtika.component';

describe('HodSevapushtikaComponent', () => {
  let component: HodSevapushtikaComponent;
  let fixture: ComponentFixture<HodSevapushtikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HodSevapushtikaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HodSevapushtikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
