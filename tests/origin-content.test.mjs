#!/usr/bin/env node
/**
 * Reads the shipped constants.ts the pages import (not a copy).
 * Asserts the 1993 origin title, year, still path, and that the file exists.
 */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const constantsPath = join(root, 'constants.ts');
const src = readFileSync(constantsPath, 'utf8');

const videoMatch = src.match(/export const ORIGIN_VIDEO = "([^"]+)"/);
if (!videoMatch) throw new Error('ORIGIN_VIDEO missing from constants.ts');
const videoPath = videoMatch[1];
const videoOnDisk = join(root, 'public', videoPath.replace(/^\//, ''));

const timelineBlock = src.slice(src.indexOf('export const TIMELINE'), src.indexOf('export const MEMORY_VIDEOS'));
const originEvent = timelineBlock.slice(0, timelineBlock.indexOf('year: 2003'));

const vaultBlock = src.slice(src.indexOf('export const MEMORY_VIDEOS'));
const originVault = vaultBlock.slice(0, vaultBlock.indexOf('id: "mem-002"'));

const checks = [
  ['TIMELINE year 1993', /year:\s*1993/.test(originEvent)],
  ['TIMELINE title Origin: The 15th Day', /title:\s*"Origin: The 15th Day"/.test(originEvent)],
  ['TIMELINE has no still image field', !/image:\s*ORIGIN_STILL/.test(originEvent)],
  ['TIMELINE video ORIGIN_VIDEO', /video:\s*ORIGIN_VIDEO/.test(originEvent)],
  ['MEMORY_VIDEOS title Origin: The 15th Day', /title:\s*"Origin: The 15th Day"/.test(originVault)],
  ['MEMORY_VIDEOS date includes 1993', /1993/.test(originVault)],
  ['MEMORY_VIDEOS url ORIGIN_VIDEO', /url:\s*ORIGIN_VIDEO/.test(originVault)],
  ['MEMORY_VIDEOS has no still thumbnail', !/thumbnail:\s*ORIGIN_STILL/.test(originVault)],
  ['ORIGIN_VIDEO path', videoPath === '/assets/videos/origin-the-15th-day-1993.mp4'],
  ['video exists on disk', existsSync(videoOnDisk)],
];

let failed = 0;
for (const [name, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`);
  if (!ok) failed += 1;
}
console.log('video', videoPath, 'disk', videoOnDisk);
if (failed) {
  process.exit(1);
}
console.log('ORIGIN_CONTENT_OK');
