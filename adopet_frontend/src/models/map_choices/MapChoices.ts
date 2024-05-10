import MapChoicesSuper from "./super/MapChoicesSuper";

export class MapAgeChoice extends MapChoicesSuper {
  constructor() {
    super(
      new Map([
        ["puppy", "Filhote"],
        ["adult", "Adulto"],
        ["old", "Idoso"],
      ])
    );
  }
}

export class MapCoatChoice extends MapChoicesSuper {
  constructor() {
    super(
      new Map([
        ["short", "Curto"],
        ["medium", "Médio"],
        ["long", "Longo"],
      ])
    );
  }
}

export class MapGenderChoice extends MapChoicesSuper {
  constructor() {
    super(
      new Map([
        ["M", "Macho"],
        ["F", "Fêmea"],
      ])
    );
  }
}

export class MapSizeChoice extends MapChoicesSuper {
  constructor() {
    super(
      new Map([
        ["small", "Pequeno porte"],
        ["medium", "Médio porte"],
        ["large", "Grande porte"],
      ])
    );
  }
}

export class MapSpecieChoice extends MapChoicesSuper {
  constructor() {
    super(
      new Map([
        ["dog", "Cachorro"],
        ["cat", "Gato"],
      ])
    );
  }
}

export class MapStateChoice extends MapChoicesSuper {
  constructor() {
    super(
      new Map([
        ["AC", "Acre"],
        ["AL", "Alagoas"],
        ["AP", "Amapá"],
        ["AM", "Amazonas"],
        ["BA", "Bahia"],
        ["CE", "Ceará"],
        ["DF", "Distrito Federal"],
        ["ES", "Espírito Santo"],
        ["GO", "Goiás"],
        ["MA", "Maranhão"],
        ["MT", "Mato Grosso"],
        ["MS", "Mato Grosso do Sul"],
        ["MG", "Minas Gerais"],
        ["PA", "Pará"],
        ["PB", "Paraíba"],
        ["PR", "Paraná"],
        ["PE", "Pernambuco"],
        ["PI", "Piauí"],
        ["RJ", "Rio de Janeiro"],
        ["RN", "Rio Grande do Norte"],
        ["RS", "Rio Grande do Sul"],
        ["RO", "Rondônia"],
        ["RR", "Roraima"],
        ["SC", "Santa Catarina"],
        ["SP", "São Paulo"],
        ["SE", "Sergipe"],
        ["TO", "Tocantins"],
      ])
    );
  }
}

export class MapStatusChoice extends MapChoicesSuper {
  constructor() {
    super(
      new Map([
        ["approved", "Aprovado"],
        ["rejected", "Rejeitado"],
        ["pending", "Pendente"],
      ])
    );
  }
}
