import { padStart } from "lodash-es";

const padded = num => padStart(String(num.toFixed(0)), 2, "0");

export function formatDuration(seconds = 0) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${padded(minutes)}:${padded(remainder)}`;
}
