import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * @example
 * <bkc-camera blur></bkc-camera>
 *
 * @todo
 * style properties in an objects and then ngFor
 */
@Component({
  // Without CommonModule it does not build.
  imports: [CommonModule],
  selector: 'bkc-camera',
  standalone: true,
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements AfterViewInit {
  #blur = false;
  #invert = false;
  #flip = false;
  #sepia = false;
  @Input()
  get blur() {
    return this.#blur;
  }
  set blur(value: BooleanInput) {
    this.#blur = coerceBooleanProperty(value);
  }
  @Input()
  get invert() {
    return this.#invert;
  }
  set invert(value: BooleanInput) {
    this.#invert = coerceBooleanProperty(value);
  }
  @Input()
  get flip() {
    return this.#flip;
  }
  set flip(value: BooleanInput) {
    this.#flip = coerceBooleanProperty(value);
  }
  isPlaying$ = new BehaviorSubject<boolean>(false);
  @Input()
  get sepia() {
    return this.#sepia;
  }
  set sepia(value: BooleanInput) {
    this.#sepia = coerceBooleanProperty(value);
  }
  @ViewChild('video') video: ElementRef | null = null;
  videoEl: HTMLVideoElement | null = null;

  ngAfterViewInit(): void {
    if (this.video !== null) {
      this.videoEl = this.video.nativeElement;
      navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: 'user' },
        })
        .then((stream: MediaStream) => {
          (this.videoEl as HTMLVideoElement).srcObject = stream;
          (this.videoEl as HTMLVideoElement)
            .play()
            .then(() => this.isPlaying$.next(true));
          (this.videoEl as HTMLVideoElement).style.visibility = 'visible';
        });
    }
  }

  get style() {
    let filter = '';
    let transform = '';
    if (this.blur) {
      filter += 'blur(5px)';
    }
    if (this.invert) {
      filter += 'invert(1)';
    }
    if (this.flip) {
      transform += 'scaleX(-1)';
    }
    if (this.sepia) {
      filter += 'sepia(50%)';
    }
    return {
      filter,
      transform,
    };
  }
}
