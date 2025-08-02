import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements CanActivate {

  constructor(
    private router: Router,
    private autenthicationService: AuthenticationService) { }

  canActivate() {
    if (!this.autenthicationService.isLogado()) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
