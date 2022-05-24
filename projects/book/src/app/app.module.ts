import { Injector, NgModule } from '@angular/core';
import { createCustomElement, NgElementConstructor } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraComponent } from './camera/camera.component';

@NgModule({
  /**
   * @error
   * Error: The selector "bkc-camera" did not match any elements
   * Because we are not loading it in index.html
   */
  // bootstrap: [CameraComponent],
  declarations: [AppComponent, CameraComponent],
  imports: [BrowserModule, AppRoutingModule],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const cameraComponent: NgElementConstructor<CameraComponent> =
      createCustomElement(CameraComponent, { injector: this.injector });
    customElements.define('bkc-camera', cameraComponent);
  }
}
