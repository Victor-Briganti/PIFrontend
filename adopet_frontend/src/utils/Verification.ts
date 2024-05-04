export function validatedName(value: string, size: number): boolean {
  const numberRegex = /{0-9}/;
  if (numberRegex.test(value) || value === "" || value.length > size) {
    return false;
  }

  return true;
}

export function validatedNumber(value: string): boolean {
  const numberRegex = /^{0-9}+$/;
  if (!numberRegex.test(value) || value === "") {
    return false;
  }

  return true;
}

export function validatedEmail(value: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(value)) return false;

  return true;
}

// O CPF passado deve ter somente números
export function validatedCPF(value: string): boolean {
  if (!/[0-9]{11}/.test(value) || value === "00000000000") {
    return false;
  }

  let sum = 0;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(value.substring(i - 1, i)) * (11 - i);
  }

  let rest = sum % 11;
  if (rest === 10 || rest === 11 || rest < 2) {
    rest = 0;
  } else {
    rest = 11 - rest;
  }

  if (rest !== parseInt(value.substring(9, 10))) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(value.substring(i - 1, i)) * (12 - i);
  }
  rest = sum % 11;

  if (rest !== parseInt(value.substring(10, 11))) {
    return false;
  }

  return true;
}
