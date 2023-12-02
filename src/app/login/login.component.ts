import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()
  
  constructor(
    private auth: AuthService,
    private router: Router
  ){}

  ngOnInit() {
    window.scroll(0, 0);
  }
  
  login() {
    this.auth.login(this.userLogin).subscribe((resp: any) => {
      if (resp) {
        this.userLogin = resp;

        console.log(resp.email);
        console.log(resp.senha);
        console.log(resp.tipo);
        console.log(resp.id);

        environment.id = resp.id;
        environment.tipo = resp.tipo;

        this.router.navigate(['/inicio']);

      } else {
        alert('Usuário ou senha estão incorretos!');
      }
    }, erro => {
      if (erro.status == 403) {
        alert('Usuário ou senha estão incorretos!');
      }
    });
  }
  
}
