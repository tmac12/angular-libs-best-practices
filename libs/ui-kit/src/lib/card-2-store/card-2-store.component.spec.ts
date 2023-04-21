import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Card2StoreComponent } from './card-2-store.component';

describe('Card2StoreComponent', () => {
  let component: Card2StoreComponent;
  let fixture: ComponentFixture<Card2StoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card2StoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Card2StoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
