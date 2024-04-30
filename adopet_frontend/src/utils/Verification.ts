export function validatedName(value: string, size: number): boolean {
  const numberRegex = /{0-9}/;
  if (numberRegex.test(value) || value === "" || value.length > size)
    return false;

  return true;
}

export function validatedNumber(value: string): boolean {
  const numberRegex = /^{0-9}+$/;
  if (!numberRegex.test(value) || value === "") return false;

  return true;
}
