import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'bkc-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements AfterViewInit {
  blur = false;
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
    if (this.blur) {
      filter += 'blur(5px)';
    }
    return {
      filter,
    };
  }
}
