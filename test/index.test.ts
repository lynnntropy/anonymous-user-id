import { getAnonymousUserId, getAnonymousUserIdWithSecret } from '../src';

const date = new Date('2000-01-01');
jest
  .spyOn(global, 'Date')
  .mockImplementation(() => (date as unknown) as string);

test('getAnonymousUserId', () => {
  expect(
    getAnonymousUserId('salt', 'test.test', '1.1.1.1', 'test/1.0')
  ).toEqual('596837e254826733d2078f28beb170c7487c35685dfdbd7d60fe73623a257ef7');
});

test('getAnonymousUserIdWithSecret', () => {
  expect(
    getAnonymousUserIdWithSecret(
      'test_secret',
      'test.test',
      '1.1.1.1',
      'test/1.0'
    )
  ).toEqual('aa322ee77d60c096af65b37d7f73a1a2df6252dcf2d4a5a6464c93ca40bece78');
});
