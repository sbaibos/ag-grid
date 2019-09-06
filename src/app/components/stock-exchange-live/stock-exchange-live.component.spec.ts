import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockExchangeLiveComponent } from './stock-exchange-live.component';

describe('StockExchangeLiveComponent', () => {
  let component: StockExchangeLiveComponent;
  let fixture: ComponentFixture<StockExchangeLiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockExchangeLiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockExchangeLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
