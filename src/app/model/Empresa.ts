import { Postagem } from "./Postagem"

export class Empresa {
    public id: number
    public nome: string
    public email: string
    public senha: string
    public cnpj: string     
    public tipo: string
    public postagem: Postagem[]
}