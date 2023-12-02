import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {  

  ngOnInit() {}

  sair() {    
    environment.nome = '';
    environment.tipo = '';
    environment.id = 0;
  }
}
