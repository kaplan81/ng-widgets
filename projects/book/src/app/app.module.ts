import { Injector, NgModule } from '@angular/core';
import { createCustomElement, NgElementConstructor } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { CameraComponent } from './camera/camera.component';

@NgModule({
  /**
   * @error
   * Error: The selector "bkc-camera" did not match any elements
   * Because we are not loading it in index.html
   */
  declarations: [CameraComponent],
  imports: [BrowserModule],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const cameraComponent: NgElementConstructor<CameraComponent> =
      createCustomElement(CameraComponent, { injector: this.injector });
    customElements.define('bkc-camera', cameraComponent);
  }
}
