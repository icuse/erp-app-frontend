import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticulosService } from '../../servicios/articulos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-articulo',
  templateUrl: './crear-articulo.component.html',
  styleUrls: ['./crear-articulo.component.css']
})
export class CrearArticuloComponent implements OnInit {

  articuloForm: FormGroup;
  articulo:any;

  constructor(
    private af: FormBuilder,
    private articulosService: ArticulosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.articuloForm = this.af.group({
      referencia: null,
      precio: null
    });
  }

  crearArticulo(){
    this.articulo = this.guardarArticulo();
    this.articulosService.postArticulos(this.articulo)
      .subscribe( (res:any)=>{
        this.router.navigate(['/listado-articulos'])
      }, (error)=>{
        console.log(error);
      });
  }

  guardarArticulo(){
    const guardarArticulo = {
      referencia: this.articuloForm.get('referencia').value,
      precio: this.articuloForm.get('precio').value
    }
    return guardarArticulo;
  }

}
