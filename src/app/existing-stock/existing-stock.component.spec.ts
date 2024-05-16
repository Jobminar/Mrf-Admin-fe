import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingStockComponent } from './existing-stock.component';

describe('ExistingStockComponent', () => {
  let component: ExistingStockComponent;
  let fixture: ComponentFixture<ExistingStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExistingStockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExistingStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
