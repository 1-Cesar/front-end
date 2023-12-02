import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from '../model/Empresa';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar-empresa.component.html',
  styleUrls: ['./cadastrar-empresa.component.css']
})
export class CadastrarEmpresaComponent implements OnInit {

  empresa: Empresa = new Empresa
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)    
  }

  confirmSenha(event: any) {
      this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  cadastrarEmpresa() {
    this.empresa.tipo = "EMPRESA"

    if(this.empresa.senha != this.confirmarSenha){
      alert('As senhas não estão iguais!');
      return;

    } else {
      this.authService.cadastrarEmpresa(this.empresa).subscribe(
        (resp: Empresa) => {
          
        this.empresa = resp;
        this.router.navigate(['/login']);
        alert('Empresa cadastrada com sucesso!');        
      },

      (error) => {
        console.error(error);
        alert('Erro ao cadastrar empresa.');
      })
    }
  }
}
