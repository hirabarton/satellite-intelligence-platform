// CSS Module declarations
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.sass' {
  const content: Record<string, string>;
  export default content;
}

// For Locomotive Scroll
declare module 'locomotive-scroll' {
  interface LocomotiveScrollOptions {
    el: HTMLElement;
    smooth?: boolean;
    multiplier?: number;
    class?: string;
  }

  export default class LocomotiveScroll {
    constructor(options: LocomotiveScrollOptions);
    on(event: string, callback: () => void): void;
    scrollTo(target: HTMLElement | number, options?: { duration?: number; disableLerp?: boolean }): void;
    update(): void;
    destroy(): void;
    scroll: {
      instance: {
        scroll: {
          y: number;
        };
      };
    };
  }
}