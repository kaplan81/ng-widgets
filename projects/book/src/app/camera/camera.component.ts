import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'bkc-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements AfterViewInit {
  @Input() blur = false;
  @Input() invert = false;
  @Input() flip = false;
  @Input() sepia = false;
  isPlaying$ = new BehaviorSubject<boolean>(false);
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
