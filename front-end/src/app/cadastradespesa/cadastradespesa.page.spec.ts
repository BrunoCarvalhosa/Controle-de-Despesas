import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastradespesaPage } from './cadastradespesa.page';

describe('CadastradespesaPage', () => {
  let component: CadastradespesaPage;
  let fixture: ComponentFixture<CadastradespesaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastradespesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
