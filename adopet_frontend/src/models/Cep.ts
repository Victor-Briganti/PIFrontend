interface FormDataCep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export default class ModelCep {
  private _cep: string;
  private _logradouro: string;
  private _complemento: string;
  private _bairro: string;
  private _localidade: string;
  private _uf: string;
  private _ibge: string;
  private _gia: string;
  private _ddd: string;
  private _siafi: string;

  constructor(data: FormDataCep) {
    this._cep = data.cep;
    this._logradouro = data.logradouro;
    this._complemento = data.complemento;
    this._bairro = data.bairro;
    this._localidade = data.localidade;
    this._uf = data.uf;
    this._ibge = data.ibge;
    this._gia = data.gia;
    this._ddd = data.ddd;
    this._siafi = data.siafi;
  }

  get cep(): string {
    return this._cep;
  }

  get logradouro(): string {
    return this._logradouro;
  }

  get complemento(): string {
    return this._complemento;
  }

  get bairro(): string {
    return this._bairro;
  }

  get localidade(): string {
    return this._localidade;
  }

  get uf(): string {
    return this._uf;
  }

  get ibge(): string {
    return this._ibge;
  }

  get gia(): string {
    return this._gia;
  }

  get ddd(): string {
    return this._ddd;
  }

  get siafi(): string {
    return this._siafi;
  }

  set cep(value: string) {
    this._cep = value;
  }

  set logradouro(value: string) {
    this._logradouro = value;
  }

  set complemento(value: string) {
    this._complemento = value;
  }

  set bairro(value: string) {
    this._bairro = value;
  }

  set localidade(value: string) {
    this._localidade = value;
  }

  set uf(value: string) {
    this._uf = value;
  }

  set ibge(value: string) {
    this._ibge = value;
  }

  set gia(value: string) {
    this._gia = value;
  }

  set ddd(value: string) {
    this._ddd = value;
  }

  set siafi(value: string) {
    this._siafi = value;
  }
}
