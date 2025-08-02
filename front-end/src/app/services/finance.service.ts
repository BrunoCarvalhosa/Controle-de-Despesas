import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  private urlBase = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthenticationService) {}

   private getHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  } 

  getReceitas(usuarioId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlBase}/receita?usuarioId=${usuarioId}`, {
        headers: this.getHeaders(),
    });
}

  getReceitaEspecifica(id: string): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/receita/${id}`);
  }

  createReceita(receita: any): Observable<any> {
    return this.http.post<any>(`${this.urlBase}/receita`, receita);
  }

  updateReceita(id: string, receita: any): Observable<any> {
    return this.http.put<any>(`${this.urlBase}/receita/${id}`, receita);
  }

  deleteReceita(id: string): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}/receita/${id}`);
  }

  // Despesas
/*   getDespesas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlBase}/despesa` , {
      headers: this.getHeaders(),
  } 
    );
  } */

  getDespesas(usuarioId: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.urlBase}/despesa?usuarioId=${usuarioId}`, {
          headers: this.getHeaders(),
      });
  }
  

  getDespesaEspecifica(id: string): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/despesa/${id}`);
  }

  createDespesa(despesa: any): Observable<any> {
    return this.http.post<any>(`${this.urlBase}/despesa`, despesa);
  }

  updateDespesa(id: string, despesa: any): Observable<any> {
    return this.http.put<any>(`${this.urlBase}/despesa/${id}`, despesa);
  }

  deleteDespesa(id: string): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}/despesa/${id}`);
  }

  getUsuario(usuarioId: string): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/usuario/${usuarioId}`, {
      headers: this.getHeaders(),
    });
  }

  updateUsuario(id: string, usuario: any) {
    return this.http.put(`${this.urlBase}/usuario/${id}`, usuario);
  }

  deleteUsuario(id: string): Observable<void> {
    const token = this.authService.getToken(); 
  
    if (!token) {
      console.error('Token não encontrado');
      throw new Error('Token não encontrado');
    }
  
    console.log('Token enviado:', token);
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
  
    return this.http.delete<void>(`${this.urlBase}/usuario/${id}`, { headers });
  }
  
  
  
  
 
}
