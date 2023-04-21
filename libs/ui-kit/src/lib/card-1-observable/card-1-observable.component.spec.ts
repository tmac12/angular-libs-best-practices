import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Card1ObservableComponent } from './card-1-observable.component';

describe('Card1ObservableComponent', () => {
  let component: Card1ObservableComponent;
  let fixture: ComponentFixture<Card1ObservableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card1ObservableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Card1ObservableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
