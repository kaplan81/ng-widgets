import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement, NgElementConstructor } from '@angular/elements';
import { CameraComponent } from './camera/camera.component';

@NgModule({
  /**
   * @error
   * Error: The selector "bkc-camera" did not match any elements
   * Because we are not loading it in index.html
   */
  declarations: [CameraComponent],
  imports: [CommonModule],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const cameraComponent: NgElementConstructor<CameraComponent> =
      createCustomElement(CameraComponent, { injector: this.injector });
    customElements.define('bkc-camera', cameraComponent);
  }
}
