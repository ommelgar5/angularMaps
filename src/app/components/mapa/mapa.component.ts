import { Component, NgZone, OnInit  } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Marcador } from '../../clases/marcador.class';
import {MatDialog } from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar/mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  lat = 51.678418;
  lng = 7.809007;

  map: google.maps.Map;
  mapClickListener: any;

  constructor(private zone: NgZone,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {

   if(localStorage.getItem('marcadores')){
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
   }

  }

  ngOnInit(): void {
  }

  agregarMarcador(coords){
    let nuevoMarcador = new Marcador(coords.lat,coords.lng);
    this.marcadores.push(nuevoMarcador);
    this.localStorage();
    this.snackBar.open('Marcador agregado', 'Cerrar', { duration: 3000 });
  }

  borrarMarcador(indice: number){
    this.marcadores.splice(indice,1);
    this.localStorage();
    this.snackBar.open('Marcador borrado', 'Cerrar', { duration: 3000 });
  }

  editarMarcador( marcador: Marcador ) {
      const dialogRef = this.dialog.open( MapaEditarComponent, {
        width: '250px',
        data: {  titulo: marcador.titulo, descripcion: marcador.descripcion }
      });

      // Obtener los datos del modal
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);

        if(!result) return;

        marcador.titulo = result.titulo;
        marcador.descripcion = result.descripcion;

        this.localStorage();
        this.snackBar.open('Marcador actualizado', 'Cerrar', { duration: 3000 });
      });
  }

  localStorage(){
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }

  /*
  @agm/core
  Corrigiendo el bug de la version: 3.0.0-beta.0

  cuando se ocupa el evento (mapClick)="agregarMarcador( $event )"
  No retorna el objeto de coordenadas, retorna una 'c'

  */
  public mapReadyHandler(map: google.maps.Map): void {
    this.map = map;
    this.mapClickListener = this.map.addListener('click', (e: google.maps.MouseEvent) => {
      this.zone.run(() => {
        let coords = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        };
        this.agregarMarcador(coords);

      });
    });
  }

  public ngOnDestroy(): void {
    if (this.mapClickListener) {
      this.mapClickListener.remove();
    }
  }




}
