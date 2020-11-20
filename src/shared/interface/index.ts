export interface HTTP<T> {
  code: number;
  metadata: {
    data?: T;
    message?: {
      code: string;
      content: string;
    };
  };
}
