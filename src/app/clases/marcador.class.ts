

export class Marcador {

  lat: number;
  lng: number;

  titulo: string = 'Sin Título';
  descripcion: string = 'Sin descripción';

  constructor(lat: number, lng: number) {
      this.lat = lat;
      this.lng = lng;
  }

}
