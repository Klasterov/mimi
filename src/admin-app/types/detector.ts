export interface DetectorExample {
  title: string;
  text: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  theme?: 'dark' | 'light';
  ruler?: {
    label: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
}

export interface HeroSection {
  title: string;
  text: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  contentWrapperClasses?: string;
  imageWrapperClasses?: string;
  sectionClasses?: string;
}

export interface InfoSection {
  title: string;
  list?: string[];
  text?: string[];
}

export interface DetectorInfo {
  sections: InfoSection[];
  theme?: 'dark' | 'light';
}

export interface Detector {
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  image: string;
  bg: string;
  linkHover: string;
  isWide?: boolean;
  detectorExample?: DetectorExample;
  hero?: HeroSection;
  info?: DetectorInfo;
}
