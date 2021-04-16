# anonymous-user-id

[![npm](https://img.shields.io/npm/v/anonymous-user-id)](https://www.npmjs.com/package/anonymous-user-id)
[![CI](https://github.com/omegavesko/anonymous-user-id/actions/workflows/main.yml/badge.svg)](https://github.com/omegavesko/anonymous-user-id/actions/workflows/main.yml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/bb0558aa4570b525ef1d/test_coverage)](https://codeclimate.com/github/omegavesko/anonymous-user-id/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/bb0558aa4570b525ef1d/maintainability)](https://codeclimate.com/github/omegavesko/anonymous-user-id/maintainability)
[![node-current](https://img.shields.io/node/v/anonymous-user-id)](package.json)
[![GitHub](https://img.shields.io/github/license/omegavesko/anonymous-user-id)](LICENSE)

`anonymous-user-id` is a JavaScript library that allows you to anonymously identify unique users on your website without requiring them to store (and consent to) a tracking cookie. Instead, we generate a unique ID for each user based on information that can be pulled out of a regular HTTP request, mainly the source IP address and `User-Agent` header.

The method we use to do this is heavily inspired by [Plausible Analytics](https://plausible.io/data-policy#how-we-count-unique-users-without-cookies), with [BLAKE2s](https://tools.ietf.org/html/rfc7693) as the hash function.

## Supported Algorithms

- `hash(salt + domain + ip + user_agent)` - This is the same algorithm used by Plausible Analytics. It relies on a salt you need to rotate at least once a day, preventing you (or anyone else) from tracking the actions of a single user for longer than the lifespan of a single salt.

- `hash(hash(secret + date) + domain + ip + user_agent)` - This is a modified (and less secure) variant of the original algorithm, meant for apps that can't reliably keep state (such as serverless functions), preventing them from storing a salt. Instead, we generate the salt from a long-lived secret (which you can set as e.g. an environment variable) and the current date.

## Getting Started

### Prerequisites

- Node >= 10 (if using in Node)

### Installing

npm:

```bash
npm i anonymous-user-id
```

yarn:

```bash
yarn add anonymous-user-id
```

## Usage

For each algorithm this package supports, it exports a function you can use to generate an ID with it.

- `getAnonymousUserId(salt: string, request: RequestDetails)`

  - implements `hash(salt + domain + ip + user_agent)`

- `getAnonymousUserIdWithSecret(secret: string, request: RequestDetails)`
  - implements `hash(hash(secret + date) + domain + ip + user_agent)`

### Example

```typescript
import {
  getAnonymousUserId,
  getAnonymousUserIdWithSecret,
} from 'anonymous-user-id';

const requestDetails = {
  domain: 'test.test',
  ip: '1.1.1.1',
  userAgent: 'test/1.0',
};

const id1 = getAnonymousUserId('salt', requestDetails);
const id2 = getAnonymousUserIdWithSecret('secret', requestDetails);
```

## Contributing

If you have Docker and Docker Compose installed, you can run `docker-compose up` to immediately get a working development environment for this package, with Jest running the tests in watch mode.

You can also use `yarn link` to use your local version of the package in a different project.

## Authors

- **Veselin Romić (omegavesko@gmail.com)**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE)
file for details.
