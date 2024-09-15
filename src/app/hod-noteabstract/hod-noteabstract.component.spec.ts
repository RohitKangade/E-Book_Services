import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodNoteabstractComponent } from './hod-noteabstract.component';

describe('HodNoteabstractComponent', () => {
  let component: HodNoteabstractComponent;
  let fixture: ComponentFixture<HodNoteabstractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HodNoteabstractComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HodNoteabstractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
