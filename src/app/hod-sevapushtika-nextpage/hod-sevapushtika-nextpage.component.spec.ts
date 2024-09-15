import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodSevapushtikaNextpageComponent } from './hod-sevapushtika-nextpage.component';

describe('HodSevapushtikaNextpageComponent', () => {
  let component: HodSevapushtikaNextpageComponent;
  let fixture: ComponentFixture<HodSevapushtikaNextpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HodSevapushtikaNextpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HodSevapushtikaNextpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
