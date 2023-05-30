import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreLoadingComponent } from './store-loading.component';

describe('StoreLoadingComponent', () => {
  let component: StoreLoadingComponent;
  let fixture: ComponentFixture<StoreLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreLoadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
