export interface VideoFiltered {
  blur: VideoFilter;
  invert: VideoFilter;
  flip: VideoFilter;
  sepia: VideoFilter;
}

export interface VideoFilter {
  checked: boolean;
  id: number;
  label: string;
}
