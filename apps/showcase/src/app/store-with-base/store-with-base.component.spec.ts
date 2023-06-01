import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreWithBaseComponent } from './store-with-base.component';

describe('StoreWithBaseComponent', () => {
  let component: StoreWithBaseComponent;
  let fixture: ComponentFixture<StoreWithBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreWithBaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreWithBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
