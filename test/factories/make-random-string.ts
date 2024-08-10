export function makeRandomString(): string {
  const randomNumber = Math.floor(Math.random() * 9999999)
  return randomNumber.toString()
}