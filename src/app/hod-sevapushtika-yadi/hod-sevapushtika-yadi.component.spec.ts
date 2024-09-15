import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodSevapushtikaYadiComponent } from './hod-sevapushtika-yadi.component';

describe('HodSevapushtikaYadiComponent', () => {
  let component: HodSevapushtikaYadiComponent;
  let fixture: ComponentFixture<HodSevapushtikaYadiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HodSevapushtikaYadiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HodSevapushtikaYadiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
