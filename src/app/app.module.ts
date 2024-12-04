import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { SeriesComponent } from './components/series/series.component';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SeriesDetailsComponent } from './components/series-details/series-details.component';
import { Routes,RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: SeriesComponent }, // Search Component
  { path: 'details/:id', component: SeriesDetailsComponent } // Details Component
];

@NgModule({
  declarations: [
    AppComponent,
    SeriesComponent,
    SeriesDetailsComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    
    MatExpansionModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
