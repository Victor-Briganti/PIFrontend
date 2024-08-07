export function validatedEmoji(value: string): boolean {
  // NÂO MEXER
  const emojiRegex =
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

  if (emojiRegex.test(value) || value === "") {
    return false;
  }

  return true;
}

export function validatedString(value: string, size: number): boolean {
  const numberRegex = /[0-9]/;
  if (numberRegex.test(value) || value === "" || value.length > size) {
    return false;
  }

  return true;
}

export function validatedNumber(value: string): boolean {
  const numberRegex = /^[0-9]+$/;
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

// Explicação do Algoritmo de validação:
//
//   Os únicos números que verdadeiramente importam
//   são os dois últimos que são usados para verificação.
//
//   Os dois últimos digitos são cálculados em cima 9
//   primeiros.
//   O cálculo começa com uma máscara sendo aplicada em cima
//   desses digítos:
//
//   Máscara   : 10    9    8    7    6    5    4    3    2
// 	 CPF       :  2    2    5    4    3    7    1    0    1
// 	 Multiplica: 20 + 18 + 40 + 28 + 18 + 35 +  4 +  0 +  2 = Somatória
//
//   Após aplicada pegamos este valor tiramos o módulo e subtraimos por
//   11 para obtermos o primeiro digito. Ficamos então com a seguinte
//   equação:
//
//   digito1 = 11 - (somatorio1 % 11)
//
//   No caso do segundo digito, começamos realizando o mesmo processo
//   de aplicação da máscara porém os valores passam a ser [11,10..3].
//   Já no caso a equação iremos utilizar o primeiro digito que iremos
//   multiplicar por 2 e somar com o segundo somatório, o resto da
//   equação segue o mesmo padrão da primeiro. Temos então:
//
//   digito2 = 11 - ((somatorio2 + digito1 * 2) % 11)
//
//   Kudos para Aurelio Jargas, Itamarnet, Lucas Souza, Henrique Moody e Marcos Barbosa.
//   Se não fosse por eles este programa que estão vendo não seria possível.
//   Caso tenham mais interesse deêm uma olhada no projeto original(que por sinal é muito f@#$%):
//   https://github.com/funcoeszz/funcoeszz/blob/master/zz/zzcpf.sh
export function validatedCPF(value: string): boolean {
  const invalidCPF = [
    "00000000000",
    "11111111111",
    "22222222222",
    "33333333333",
    "44444444444",
    "55555555555",
    "66666666666",
    "77777777777",
    "88888888888",
    "99999999999",
  ];

  if (
    !/[0-9]{11}/.test(value) ||
    invalidCPF.includes(value) ||
    value.length > 11
  ) {
    return false;
  }

  let sum = 0;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(value.substring(i - 1, i)) * (11 - i);
  }

  let digito1 = 11 - (sum % 11);
  if (digito1 >= 10) {
    digito1 = 0;
  }

  sum = 0;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(value.substring(i - 1, i)) * (12 - i);
  }

  let digito2 = 11 - ((sum + digito1 * 2) % 11);
  if (digito2 >= 10) {
    digito2 = 0;
  }

  if (
    digito2 !== parseInt(value.substring(10, 11)) ||
    digito1 !== parseInt(value.substring(9, 10))
  ) {
    return false;
  }

  return true;
}
