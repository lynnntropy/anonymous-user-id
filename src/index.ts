import * as blake3 from 'blake3';
import { formatISO } from 'date-fns';

export const getAnonymousUserId = (
  salt: string,
  domain: string,
  ip: string,
  userAgent: string
): string => {
  return blake3.hash(`${salt}|${domain}|${ip}|${userAgent}`).toString('hex');
};

export const getAnonymousUserIdWithSecret = (
  secret: string,
  domain: string,
  ip: string,
  userAgent: string
): string =>
  getAnonymousUserId(
    blake3
      .hash(`${secret}/${formatISO(new Date(), { representation: 'date' })}`)
      .toString('hex'),
    domain,
    ip,
    userAgent
  );
