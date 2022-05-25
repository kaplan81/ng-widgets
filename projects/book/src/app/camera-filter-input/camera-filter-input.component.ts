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

  /**
   * @todo
   * If we register this component as custom element it emits a JS CustomEvent
   * instead of the value.
   * We need to fix that.
   */
  toggleCheckEmit(): void {
    this.toggleCheck.emit(this.videoFilterId);
  }

  private getFilter(filterId: number): VideoFilter | undefined {
    const filter: [string, VideoFilter] | undefined =
      this.getFilterEntry(filterId);
    return filter ? filter[1] : undefined;
  }

  private getFilterEntry(filterId: number): [string, VideoFilter] | undefined {
    if (this.videoFilters != null) {
      return Object.entries(this.videoFilters).find(
        (videoFiltersEntry: [string, VideoFilter]) =>
          videoFiltersEntry[1].id === filterId
      );
    }
    return undefined;
  }
}
