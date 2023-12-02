import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Postagem } from '../model/Postagem';
import { Candidatura } from '../model/Candidatura';
import { User } from '../model/User';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  postagem: Postagem = new Postagem();
  postagens: Postagem[] = [];
  candidatura: Candidatura = new Candidatura();
  usuarioAtual: number;
  candidaturas: Candidatura[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.recuperarPostagens();
    this.usuarioAtual = this.authService.getCurrentUser();
    console.log("Usuário Atual:", environment.id);

    if (this.isEmpresa()) {
      this.recuperarPostagensEmpresa();
    }
  }

  isEmpresa(): boolean {
    return this.authService.isEmpresa();
  }

  realizarPostagem() {
    this.postagem.dataPost = Date.now()
    this.postagem.juridicoID = this.usuarioAtual

    if (this.postagem.titulo == "" || this.postagem.texto == "") {
      alert("Necessario preencher todos os dados!")
      return
      
    } else {
      this.authService.realizarPostagem(this.postagem).subscribe(
        (resp: Postagem) => {

          this.postagem = resp
          this.router.navigate(['/inicio'])
          alert("Postagem realizada com sucesso!")
          this.postagem = new Postagem(); 
        },

        (error) => {
          console.error(error)
          alert("Erro ao realizar postagem.")
        }
      )
    }
  }

  recuperarPostagens() {
    this.authService.recuperarPostagens().subscribe(
      (postagens: Postagem[]) => {
        this.postagens = postagens;
        console.log("Postagens recuperadas com sucesso!");
      },
      (error) => {
        console.error(error);
        alert("Erro ao recuperar postagens.");
      }
    );
  }

  recuperarPostagensEmpresa() {
    if (this.isEmpresa()) {
      this.authService.recuperarPostagensEmpresa(this.usuarioAtual).subscribe(
        (postagens: Postagem[]) => {
          this.postagens = postagens;
          console.log("Postagens da empresa recuperadas com sucesso!");
        },
      );
    }
  }  

  realizarCandidatura(idPostagem: number) {
    console.log("Usuário ID:", this.usuarioAtual, "Postagem ID:", idPostagem);

    this.authService.criarCandidatura(this.usuarioAtual, idPostagem).subscribe(
      (resp) => {
        alert("Candidatura realizada com sucesso!");
      },
      (error) => {
        console.error(error);
        alert("Erro ao realizar candidatura.");
      }
    );
  }

  candidaturasExibidas: {[key: number]: Candidatura[]} = {};

  exibirCandidatos(idPostagem: number) {
    this.authService.recuperarCandidaturasPorPostagem(idPostagem).subscribe(
      (candidaturas: Candidatura[]) => {
        this.candidaturasExibidas[idPostagem] = candidaturas;
      },
      (error) => {
        console.error("Erro ao recuperar candidaturas:", error);
        alert("Erro ao recuperar candidaturas.");
      }
    );
  }
  
}
