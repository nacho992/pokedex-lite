import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateEditFormComponent } from './pages/create-edit-form/create-edit-form.component';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';
import { CardRowComponent } from './components/card-row/card-row.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    LoginComponent,
    CreateEditFormComponent,
    PokemonDetailsComponent,
    CardRowComponent,
    InputSearchComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    InfiniteScrollModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
