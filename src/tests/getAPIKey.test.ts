import { describe, it, expect } from 'vitest';
import type { IncomingHttpHeaders } from 'http';
import { getAPIKey } from 'src/api/auth';

describe('getAPIKey', () => {
  it('return key from right header', () => {
    const headers: IncomingHttpHeaders = {
      authorization: 'ApiKey my-secret-key',
    };

    const result = getAPIKey(headers);
    expect(result).toBe('my-secret-key');
  });

  it('return null if authorization header not found', () => {
    const headers: IncomingHttpHeaders = {};

    const result = getAPIKey(headers);
    expect(result).toBeNull();
  });

  it('return null if authorization header not starts with ApiKey', () => {
    const headers: IncomingHttpHeaders = {
      authorization: 'Bearer some-token',
    };

    const result = getAPIKey(headers);
    expect(result).toBeNull();
  });

  it('return null if authorization header empty or invalid', () => {
    const headers1: IncomingHttpHeaders = { authorization: 'ApiKey' }; // без ключа
    const headers2: IncomingHttpHeaders = { authorization: '' }; // порожній рядок

    expect(getAPIKey(headers1)).toBeNull();
    expect(getAPIKey(headers2)).toBeNull();
  });

  it('ignore other parts of authorization header after key', () => {
    const headers: IncomingHttpHeaders = {
      authorization: 'ApiKey my-secret-key extra',
    };

    const result = getAPIKey(headers);
    expect(result).toBe('my-secret-key');
  });
});
