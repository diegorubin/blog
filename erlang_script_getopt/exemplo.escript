#!/usr/bin/env escript
% O arquivo que será lido é um csv como o descrito abaixo
% Nome, nota1, nota2, nota3

-module(exemplo).
-author('rubin.diego@gmail.com').

main([]) ->
  usage();
main(Args) ->
  {ok, {Options, Arquivo}} = getopt:parse(option_spec_list(),Args),
  io:format("Executando o script ~n"
            "Args: ~p~n~n"
            "Options: ~p~n~n"
            "Arquivo: ~p~n~n", [Args, Options, Arquivo]),

  [Media|_] = [X || {media, X} <- Options],
  [Aprovado|_] = [X || {aprovado, X} <- Options],
  [Reprovado|_] = [X || {reprovado, X} <- Options],

  read(Arquivo, Media, Aprovado, Reprovado).

% Se não houver nenhum parametro passado via linha de comando
% essa função será executada.
usage() ->
  usage(escript:script_name()).

usage(Name) ->
  getopt:usage(option_spec_list(), Name, "arquivo", 
               [{"arquivo", "Arquivo csv contendo as informações descritas no código."}]).

option_spec_list() ->
  [
    % {Nome, NomeCurto,  NomeLongo,  Tipo Esperado, Mensagem de Ajuda}
    {aprovado, $a, "aprovado", {string, "Aprovado"}, "Mensagem que será exibida se o aluno foi aprovado"},
    {reprovado, $r, "reprovado", {string, "Reprovado"}, "Mensagem que será exibida se o aluno foi reprovado"},
    {media, $m, "media", {float, 5}, "Média minima para o aluno ser aprovado"}
  ].

% Leitura do arquivo com os dados dos alunos e calculo das média.
read(Filename, Media, Aprovado, Reprovado) ->
  {ok, Fd} = file:open(Filename, [read]),
  read(io:get_line(Fd, ""), Fd, Media, Aprovado, Reprovado).

read(eof, File, _Media, _Aprovado, _Reprovado) ->
  file:close(File);
read(Line, File, Media, Aprovado, Reprovado) ->
  {Nome, Resultado} = calculate(string:strip(Line, right, $\n)),
  resultado(Nome, Resultado, Media, Aprovado, Reprovado),
  Content = io:get_line(File, ""),
  read(Content, File, Media, Aprovado, Reprovado).

calculate(Line) ->
  % As informações no arquivo estão dispostas como o exemplo no comeco do arquivo.
  % Iremos quebrar as informações separadas por vírgulas.
  Infos = string:tokens(Line, ","),
  [Nome|Notas] = Infos,
  Resultado = (lists:sum([list_to_float(string:strip(X)) || X <- Notas ])/3.0),
  {Nome, Resultado}.

resultado(Nome, Resultado, Media, Aprovado, Reprovado) ->
  Mensagem = if 
    Resultado >= Media ->
      Aprovado;
    true ->
      Reprovado
    end,
  io:format("~s ~s ~.1f~n", [Nome, Mensagem, Resultado]).

