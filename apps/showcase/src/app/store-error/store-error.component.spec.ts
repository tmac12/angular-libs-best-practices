import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreErrorComponent } from './store-error.component';

describe('StoreErrorComponent', () => {
  let component: StoreErrorComponent;
  let fixture: ComponentFixture<StoreErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreErrorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
