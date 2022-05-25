import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { VideoFilter, VideoFiltered } from '../video.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'bkc-camera-filter-input',
  templateUrl: './camera-filter-input.component.html',
  standalone: true,
  styleUrls: ['./camera-filter-input.component.scss'],
})
export class CameraFilterInputComponent {
  @Input() videoFilterId!: number;
  @Input() videoFilters!: VideoFiltered;
  @Output() toggleCheck = new EventEmitter<number>();

  isChecked(filterId: number): boolean {
    const filter: VideoFilter | undefined = this.getFilter(filterId);
    if (filter !== undefined) {
      return filter.checked;
    }
    return false;
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
}
