import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';
import { Empresa } from '../model/Empresa';
import { Postagem } from '../model/Postagem';
import { Candidatura } from '../model/Candidatura';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User;

  constructor(private http: HttpClient) {}

  isEmpresa(): boolean {
    return environment.tipo === 'EMPRESA';
  }

  getCurrentUser(): number {
    return environment.id;
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  login(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>(
      'http://localhost:8080/login/logar',
      userLogin
    );
  }

  cadastrarEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(
      'http://localhost:8080/empresa/cadastrar',
      empresa
    );
  }

  cadastrarUsuario(user: User): Observable<User> {
    return this.http.post<User>(
      'http://localhost:8080/usuario/cadastrar',
      user
    );
  }

  realizarPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>(
      'http://localhost:8080/postagem/novoPost',
      postagem
    );
  }

  recuperarPostagens(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(
      'http://localhost:8080/postagem/recuperarPostagens'
    );
  }

  recuperarPostagensEmpresa(juridicoid: number): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(
      `http://localhost:8080/postagem/recuperarPostagensEmpresa/${juridicoid}`
    );
  }  

  criarCandidatura(
    usuarioId: number,
    postagemId: number
  ): Observable<Candidatura> {
    const params = new HttpParams()
      .set('usuarioId', usuarioId.toString())
      .set('postagemId', postagemId.toString());

      console.log("Parâmetros HTTP:", params.toString());
      
    return this.http.post<Candidatura>(
      'http://localhost:8080/candidatura/criarCandidatura', params
    );
  }

  recuperarCandidaturasPorPostagem(idPostagem: number): Observable<Candidatura[]> {
    return this.http.get<Candidatura[]>(
      `http://localhost:8080/candidatura/recuperarPorPostagem/${idPostagem}`
    );
  }
}
