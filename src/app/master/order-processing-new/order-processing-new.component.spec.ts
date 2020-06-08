import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProcessingNewComponent } from './order-processing-new.component';

describe('OrderProcessingNewComponent', () => {
  let component: OrderProcessingNewComponent;
  let fixture: ComponentFixture<OrderProcessingNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderProcessingNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProcessingNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
