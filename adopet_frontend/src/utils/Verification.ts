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

  if (!/[0-9]{11}/.test(value) && !invalidCPF.includes(value)) {
    return false;
  }

  let sum = 0;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(value.substring(i - 1, i)) * (11 - i);
  }

  const digito1 = 11 - (sum % 11);
  if (digito1 !== parseInt(value.substring(9, 10))) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(value.substring(i - 1, i)) * (12 - i);
  }
  const digito2 = 11 - ((sum + digito1 * 2) % 11);

  if (digito2 !== parseInt(value.substring(10, 11))) {
    return false;
  }

  return true;
}
