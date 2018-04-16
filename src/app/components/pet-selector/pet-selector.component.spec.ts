import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetSelectorComponent } from './pet-selector.component';

describe('PetSelectorComponent', () => {
  let component: PetSelectorComponent;
  let fixture: ComponentFixture<PetSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
