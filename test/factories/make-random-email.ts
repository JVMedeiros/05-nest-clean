import { makeRandomString } from "./make-random-string";

export function makeRandomEmail(): string {
  const randomUsername = makeRandomString()
  const fakeDomains = ['example.com', 'test.com', 'email.com', 'mail.com'];

  const randomDomain = fakeDomains[Math.floor(Math.random() * fakeDomains.length)];

  return `${randomUsername}@${randomDomain}`;
}
