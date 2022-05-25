import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VideoFilter, VideoFiltered } from '../video.model';

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
  #videoFilters: VideoFiltered = {
    blur: {
      checked: false,
      id: 1,
    },
    invert: {
      checked: false,
      id: 2,
    },
    flip: {
      checked: false,
      id: 3,
    },
    sepia: {
      checked: false,
      id: 4,
    },
  };
  isPlaying$ = new BehaviorSubject<boolean>(false);
  get videoFilters(): VideoFiltered {
    return this.#videoFilters;
  }
  set videoFilters(value: VideoFiltered) {
    this.#videoFilters = value;
  }
  @ViewChild('video') video: ElementRef | null = null;
  videoEl: HTMLVideoElement | null = null;

  isChecked(filterId: number): boolean {
    const filter: VideoFilter | undefined = this.getFilter(filterId);
    if (filter !== undefined) {
      return filter.checked;
    }
    return false;
  }

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

  get style(): { filter: string; transform: string } {
    let filter = '';
    let transform = '';
    if (this.videoFilters.blur.checked) {
      filter += 'blur(5px)';
    }
    if (this.videoFilters.invert.checked) {
      filter += 'invert(1)';
    }
    if (this.videoFilters.flip.checked) {
      transform += 'scaleX(-1)';
    }
    if (this.videoFilters.sepia.checked) {
      filter += 'sepia(50%)';
    }
    return {
      filter,
      transform,
    };
  }

  toggleChecked(filterId: number): boolean | void {
    const filterKey: keyof VideoFiltered | undefined =
      this.getFilterKey(filterId);
    if (filterKey !== undefined) {
      return (this.videoFilters[filterKey].checked =
        !this.videoFilters[filterKey].checked);
    }
    return;
  }

  private getFilter(filterId: number): VideoFilter | undefined {
    const filter: [string, VideoFilter] | undefined =
      this.getFilterEntry(filterId);
    return filter ? filter[1] : undefined;
  }

  private getFilterEntry(filterId: number): [string, VideoFilter] | undefined {
    return Object.entries(this.videoFilters).find(
      (videoFiltersEntry: [string, VideoFilter]) =>
        videoFiltersEntry[1].id === filterId
    );
  }

  private getFilterKey(filterId: number): keyof VideoFiltered | undefined {
    const filter: [string, VideoFilter] | undefined =
      this.getFilterEntry(filterId);
    return filter ? (filter[0] as keyof VideoFiltered) : undefined;
  }
}
