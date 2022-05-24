import { Injector, NgModule } from '@angular/core';
import { createCustomElement, NgElementConstructor } from '@angular/elements';
import { CameraComponent } from './camera/camera.component';

@NgModule()
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const cameraComponent: NgElementConstructor<CameraComponent> =
      createCustomElement(CameraComponent, { injector: this.injector });
    customElements.define('bkc-camera', cameraComponent);
  }
}
