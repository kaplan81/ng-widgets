import { Injector, NgModule, Type } from '@angular/core';
import { createCustomElement, NgElementConstructor } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { CameraComponent } from './camera/camera.component';

@NgModule({
  imports: [BrowserModule],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    // @todo import conditionally.
    (
      import('./camera/camera.component') as Promise<
        any & Record<any, Type<any>>
      >
    ).then((cameraComponent) => {
      // @todo move to a global const so that we can use it in the @Component selector, too.
      const cameraElTag = 'bkc-camera';
      // @todo: create window service.
      if (!customElements.get(cameraElTag)) {
        const cameraComponentEl: NgElementConstructor<CameraComponent> =
          createCustomElement(cameraComponent.CameraComponent, {
            injector: this.injector,
          });
        customElements.define(cameraElTag, cameraComponentEl);
      }
      return cameraComponent;
    });
  }
}
