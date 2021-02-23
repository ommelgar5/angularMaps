import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Google Maps
import { AgmCoreModule } from '@agm/core';

// componentes
import { AppComponent } from './app.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { MapaEditarComponent } from './components/mapa/mapa-editar/mapa-editar.component';

// Aproximacion por data
import { ReactiveFormsModule } from '@angular/forms';

/*

 la  propiedad entryComponents:[] es para especificar que component se pueden pasar de forma dimanica,
 en angular 11 no la he ocupado

*/

@NgModule({
  declarations: [
    AppComponent,
    MapaComponent,
    MapaEditarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDP0TQx8yqtFFjZ_FZJqRWlVVkenFGS6YM'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
