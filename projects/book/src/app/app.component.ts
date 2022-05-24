import { Component, Injector } from '@angular/core';
import { createCustomElement, NgElementConstructor } from '@angular/elements';
import { CameraComponent } from './camera/camera.component';

@Component({
  standalone: true,
  template: '',
})
export class AppComponent {
  constructor(private injector: Injector) {
    const cameraComponent: NgElementConstructor<CameraComponent> =
      createCustomElement(CameraComponent, { injector: this.injector });
    customElements.define('bkc-camera', cameraComponent);
  }
}
