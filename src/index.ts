import * as blake3 from 'blake3';
import { formatISO } from 'date-fns';

const hash = (input: blake3.HashInput): string =>
  blake3.hash(input).toString('hex');

export const getAnonymousUserId = (
  salt: string,
  domain: string,
  ip: string,
  userAgent: string
): string => {
  return hash(`${salt}|${domain}|${ip}|${userAgent}`);
};

export const getAnonymousUserIdWithSecret = (
  secret: string,
  domain: string,
  ip: string,
  userAgent: string
): string =>
  getAnonymousUserId(
    hash(`${secret}/${formatISO(new Date(), { representation: 'date' })}`),
    domain,
    ip,
    userAgent
  );
