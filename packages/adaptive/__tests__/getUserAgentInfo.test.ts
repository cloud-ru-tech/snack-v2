import { describe, expect, it } from 'vitest';

import { DEVICE_TYPE, getUserAgentInfo } from '../src/utils/getUserAgentInfo';

const UA = {
  iphone:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
  ipad: 'Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
  androidPhone:
    'Mozilla/5.0 (Linux; Android 14; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36',
  androidTablet:
    'Mozilla/5.0 (Linux; Android 13; SM-X710) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  macChrome:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  macSafari:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15',
  windowsEdge:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0',
  windowsFirefox: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.0',
  smartTv:
    'Mozilla/5.0 (SMART-TV; Linux; Tizen 6.0) AppleWebKit/537.36 (KHTML, like Gecko) Version/6.0 TV Safari/537.36',
  playstation: 'Mozilla/5.0 (PlayStation 5/6.00) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15',
};

describe('getUserAgentInfo — device.type (то, на чём стоит раскладка)', () => {
  it.each([
    ['iphone', UA.iphone, DEVICE_TYPE.Mobile],
    ['ipad', UA.ipad, DEVICE_TYPE.Tablet],
    ['android phone', UA.androidPhone, DEVICE_TYPE.Mobile],
    ['android tablet', UA.androidTablet, DEVICE_TYPE.Tablet],
    ['mac chrome', UA.macChrome, DEVICE_TYPE.Desktop],
    ['windows edge', UA.windowsEdge, DEVICE_TYPE.Desktop],
    ['smart tv', UA.smartTv, DEVICE_TYPE.Smarttv],
    ['playstation', UA.playstation, DEVICE_TYPE.Console],
  ])('%s -> %s', (_name, userAgent, expected) => {
    expect(getUserAgentInfo(userAgent).device.type).toBe(expected);
  });

  it('пустой user-agent на сервере деградирует к desktop', () => {
    expect(getUserAgentInfo('').device.type).toBe(DEVICE_TYPE.Desktop);
    expect(getUserAgentInfo('totally unknown agent').device.type).toBe(DEVICE_TYPE.Desktop);
  });
});

describe('getUserAgentInfo — os', () => {
  it.each([
    [UA.iphone, { name: 'iOS', version: '17.5.1' }],
    [UA.androidPhone, { name: 'Android', version: '14' }],
    [UA.windowsEdge, { name: 'Windows', version: '10' }],
    [UA.macChrome, { name: 'macOS', version: '10.15.7' }],
  ])('%s', (userAgent, expected) => {
    expect(getUserAgentInfo(userAgent).os).toEqual(expected);
  });
});

describe('getUserAgentInfo — browser (Edge/Opera маскируются под Chrome, Chrome под Safari)', () => {
  it.each([
    [UA.windowsEdge, 'Edge', '126'],
    [UA.macChrome, 'Chrome', '126'],
    [UA.macSafari, 'Safari', '17'],
    [UA.windowsFirefox, 'Firefox', '127'],
    [UA.androidPhone, 'Chrome', '126'],
  ])('%s -> %s', (userAgent, name, major) => {
    const { browser } = getUserAgentInfo(userAgent);

    expect(browser.name).toBe(name);
    expect(browser.major).toBe(major);
  });
});

describe('getUserAgentInfo — device.model', () => {
  it.each([
    [UA.iphone, 'iPhone'],
    [UA.ipad, 'iPad'],
    [UA.androidPhone, 'SM-S911B'],
  ])('%s -> %s', (userAgent, expected) => {
    expect(getUserAgentInfo(userAgent).device.model).toBe(expected);
  });
});
