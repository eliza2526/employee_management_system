import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeeModalComponent } from './edit-employee-modal.component';

describe('EditEmployeeModalComponent', () => {
  let component: EditEmployeeModalComponent;
  let fixture: ComponentFixture<EditEmployeeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEmployeeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEmployeeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
