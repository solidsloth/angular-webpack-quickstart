import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { MyAppComponent } from './my-app/my-app.component';
@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    MyAppComponent
  ],
  bootstrap: [ MyAppComponent ]
})
export class AppModule { }
