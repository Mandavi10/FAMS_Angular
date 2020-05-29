import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TBstructureComponent } from './tbstructure.component';

describe('TBstructureComponent', () => {
  let component: TBstructureComponent;
  let fixture: ComponentFixture<TBstructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TBstructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TBstructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
