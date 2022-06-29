export type Recording = {
  start: () => void;
  stop: () => Promise<string>;
};
