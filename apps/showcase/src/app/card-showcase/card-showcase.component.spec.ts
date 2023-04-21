import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardShowcaseComponent } from './card-showcase.component';

describe('CardShowcaseComponent', () => {
  let component: CardShowcaseComponent;
  let fixture: ComponentFixture<CardShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardShowcaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
