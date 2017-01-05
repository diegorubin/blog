WebApp
======

## Objetivo

O objetivo desse projeto é servir como uma arquitetura
de referencia para aplicações web utilizando node e express.

Através desse exemplo, quero cobrir pontos que normalmente
são negligenciados neste tipo de projeto, como por exemplo,
cobertura de testes unitários e uma boa organização do
código.

## Principais técnologias utilizadas no exemplo

- __Express__: O express foi escolhido para ser o framework
principal deste projeto.

- __Testes unitários__: O Jasmine foi adotado como principal
ferramente para a criação dos testes unitários, mas ele também
pode ser facilmente trocado pelo mocha + chai + sinon.

- __Engine para renderização:__ O projeto está configurado
para usar o [pug](). Ele é uma melhoria do Jade e possui
e é baseado no haml. _Atenção:_ o uso do pug não é mandatório
para usar esse projeto como referencia. De forma bem simples
é possível usar qualquer outra engine, como o [handlebars](), [dotjs]() ou [dustjs](),
por exemplo.

## Iniciando o projeto

Para subir o servidor basta executar o comando:

    npm start

Para executar os testes unitários:

    npm test


