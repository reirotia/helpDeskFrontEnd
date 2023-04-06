import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credencias } from 'src/app/models/credentcias';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credencias = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));


  constructor(
    private toats: ToastrService,
    private service: AuthService,
    private router: Router

    ){}

  ngOnInit(): void {

  }

  logar(): any {


    this.service.autenticate(this.creds)
      .subscribe(resposta => {
        this.service.successfulLogin(resposta.headers.get('Authorization').substring(7));
        this.router.navigate(['home']);
      } , () => {
        this.toats.error('Usuário e /ou senha invalido');
      })
  }








  validaCampos(): boolean {

    return this.email.valid && this.senha.valid
  }
}
