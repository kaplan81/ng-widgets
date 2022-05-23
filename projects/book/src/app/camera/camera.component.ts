import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'bkc-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements AfterViewInit {
  @ViewChild('video') video: ElementRef | null = null;

  ngAfterViewInit(): void {
    if (this.video !== null) {
      const videoEl: HTMLVideoElement = this.video.nativeElement;
      navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: 'user' },
        })
        .then((stream: MediaStream) => (videoEl.srcObject = stream));
    }
  }
}
