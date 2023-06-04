//External imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

//Internal imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScraperComponent } from './scraper/scraper.component';

@NgModule({
  declarations: [AppComponent, ScraperComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    NgxJsonViewerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
