import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoodcatergoryComponent } from './add-foodcatergory.component';

describe('AddFoodcatergoryComponent', () => {
  let component: AddFoodcatergoryComponent;
  let fixture: ComponentFixture<AddFoodcatergoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFoodcatergoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFoodcatergoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
