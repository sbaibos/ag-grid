import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMarketsComponent } from './stock-markets.component';

describe('StockMarketsComponent', () => {
  let component: StockMarketsComponent;
  let fixture: ComponentFixture<StockMarketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockMarketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockMarketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
