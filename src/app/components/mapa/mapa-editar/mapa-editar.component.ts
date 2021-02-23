import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-mapa-editar',
  templateUrl: './mapa-editar.component.html',
  styleUrls: ['./mapa-editar.component.css']
})
export class MapaEditarComponent  {

  forma: FormGroup;

  // MatDialogRef<MapaEditarComponent> especifica una referencia al mismo componente padre
  // MAT_DIALOG_DATA                   Para injectar la data desde se manda ha llamar el modal

  constructor(
    public dialogRef: MatDialogRef<MapaEditarComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { titulo: string, descripcion: string }) {

      this.forma = fb.group({
        titulo: data.titulo,
        descripcion: data.descripcion
      });
    }

  guardarCambios() {

    // Eviar la data al padre
    this.dialogRef.close(this.forma.value);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
