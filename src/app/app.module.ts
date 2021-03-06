import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { environment } from '../environments/environment';
import { PetSelectorComponent } from './components/pet-selector/pet-selector.component'; // Angular CLI environemnt
import { ButtonsModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

export function highchartsFactory() {
  return require('highcharts');
}

@NgModule({
  declarations: [
    AppComponent,
    PetSelectorComponent,
    PieChartComponent,
    BarChartComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    ButtonsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ChartModule,
    NgxDatatableModule
  ],
  providers: [{
    provide: HighchartsStatic,
    useFactory: highchartsFactory
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
