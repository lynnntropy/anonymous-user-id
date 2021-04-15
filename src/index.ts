import * as blake3 from 'blake3';
import { formatISO } from 'date-fns';

interface RequestDetails {
  domain?: string;
  ip?: string;
  userAgent?: string;
}

const hash = (input: blake3.HashInput): string =>
  blake3.hash(input).toString('hex');

/**
 * Get a standard anonymous user ID (hash(salt + domain + ip + user_agent)),
 * from a request, like the one used by Plausible Analytics.
 *
 * @see {@link https://plausible.io/data-policy#how-we-count-unique-users-without-cookies}
 *
 * @param salt A salt. You should rotate this at least once a day,
 *             and delete old salts as soon as you're done using them.
 *             This ensures that you can't track users long-term.
 * @param request Parameters extracted from your HTTP request.
 */
export const getAnonymousUserId = (
  salt: string,
  request: RequestDetails
): string => {
  return hash(
    `${salt}|${request.domain ?? ''}|${request.ip ?? ''}|${request.userAgent ??
      ''}`
  );
};

/**
 * Get an anonymous user ID from a request, using a modified (and slightly less secure)
 * variant of the algorithm used by used by Plausible Analytics. This variant is
 * optimized for apps that can't reliably keep state (e.g. serverless functions).
 * Instead of a salt that changes on a regular basis, you only need to provide a
 * secret that's always the same (and thus can be defined as e.g. an environment variable).
 *
 * @param secret Your secret.
 * @param request Parameters extracted from your HTTP request.
 */
export const getAnonymousUserIdWithSecret = (
  secret: string,
  request: RequestDetails
): string =>
  getAnonymousUserId(
    hash(`${secret}/${formatISO(new Date(), { representation: 'date' })}`),
    request
  );
