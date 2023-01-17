import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenyConverterComponent } from './curreny-converter.component';

describe('CurrenyConverterComponent', () => {
  let component: CurrenyConverterComponent;
  let fixture: ComponentFixture<CurrenyConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrenyConverterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrenyConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
