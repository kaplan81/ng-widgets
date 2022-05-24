import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'bkc-app',
  standalone: true,
  template: `<button [routerLink]="['/camera']">GO TO CAMERA</button
    ><router-outlet></router-outlet>`,
})
export class AppComponent {
  // constructor(private injector: Injector) {
  // const cameraComponent: NgElementConstructor<CameraComponent> =
  //   createCustomElement(CameraComponent, { injector: this.injector });
  // customElements.define('bkc-camera', cameraComponent);
  // }
}
