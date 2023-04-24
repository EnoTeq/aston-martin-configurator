import {setTimeout} from 'timers/promises';

export async function sleep(durationMs: number) {
  await setTimeout(durationMs)
}
