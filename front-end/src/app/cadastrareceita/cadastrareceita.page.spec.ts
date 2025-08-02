import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrareceitaPage } from './cadastrareceita.page';

describe('CadastrareceitaPage', () => {
  let component: CadastrareceitaPage;
  let fixture: ComponentFixture<CadastrareceitaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrareceitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
