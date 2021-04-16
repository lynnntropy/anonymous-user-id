import { getAnonymousUserId, getAnonymousUserIdWithSecret } from '../src';

const date = new Date('2000-01-01');
jest
  .spyOn(global, 'Date')
  .mockImplementation(() => (date as unknown) as string);

test('getAnonymousUserId', () => {
  expect(
    getAnonymousUserId('salt', {
      domain: 'test.test',
      ip: '1.1.1.1',
      userAgent: 'test/1.0',
    })
  ).toEqual('7a7a88b65404da1983bff9f57c27f4449f7f0d3a68f526f65fb57ab958e09bfc');
});

test('getAnonymousUserIdWithSecret', () => {
  expect(
    getAnonymousUserIdWithSecret('test_secret', {
      domain: 'test.test',
      ip: '1.1.1.1',
      userAgent: 'test/1.0',
    })
  ).toEqual('6f3dd1b774fd27004d890d12150ffa5a793d2d7d68d631478de4e307897eee17');
});
