import { HttpModule, JsonpModule } from '@angular/http';
import { FlyerService } from './service/flyer/flyer.service';
import { DialogsModule } from './shared/dialog/dialog.module';
import { HeaderComponent } from './components/pages/header/header.component';
import { SidenavComponent } from './components/pages/sidenav/sidenav.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent }  from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdButtonModule, MdTabsModule } from '@angular/material';

import 'hammerjs';

const rootRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports:[ 
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdButtonModule,
    MdTabsModule,

    HttpModule,
    JsonpModule,
    DialogsModule,
    
    RouterModule.forRoot(rootRoutes),
   ],
  declarations: [ AppComponent, HomeComponent, SidenavComponent, HeaderComponent ],
  providers: [ FlyerService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
