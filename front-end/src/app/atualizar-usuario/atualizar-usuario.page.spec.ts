import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtualizarUsuarioPage } from './atualizar-usuario.page';

describe('AtualizarUsuarioPage', () => {
  let component: AtualizarUsuarioPage;
  let fixture: ComponentFixture<AtualizarUsuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
