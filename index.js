var loadjson      = require('loadjson');
var produtos      = loadjson('produtos.json').produtos;
var restricoes    = loadjson('produtos.json').restricoes;
var SimpleSimplex = require('simple-simplex');
var _             = require('lodash');
var metodo = process.argv.slice(2)[0];
var problemas = {
	'minimizar': 'min',
	'maximizar': 'max'
};

//initialize a solver 
var solver = new SimpleSimplex({
  objective: {
    Sandalia: produtos[0].Preco,
    Sapato: produtos[1].Preco
    
  },
  constraints: [
    {
      namedVector: { Sandalia: produtos[0].Couro, Sapato: produtos[1].Couro},
      constraint: restricoes[0].Tipo,
      constant: restricoes[0].Couro
    },
    {
      namedVector: {Sandalia: produtos[0].Horas, Sapato: produtos[1].Horas},
      constraint: restricoes[1].Tipo,
      constant: restricoes[1].Horas
    },
    {
      namedVector: {Sandalia: produtos[0].Pessoas, Sapato: produtos[1].Pessoas},
      constraint: restricoes[2].Tipo,
      constant: restricoes[2].Pessoas
    },
  ],
  optimizationType: problemas[metodo]
});

var result = solver.solve({
  methodName: 'simplex',
});

console.log({
  solucao: result.solution,
  ÉOtimizavel: result.details.isOptimal,
});