# encoding: utf-8
# language: pt
Funcionalidade: Cadastro de usuário
  Contexto:
    Dado que esteja no formulário de cadastro de usuário

  Cenário: Não enviar se o email for inválido
    Quando eu adiciono o email "errado@com"
    E clico em "create"
    Então deve ser exibido a mensagem de erro "email.invalid"

  Cenário: Não enviar se as senhas não conferem
    Quando eu insiro a senha "12345"
    E eu insiro na confirmação da senha "123456"
    E clico em "create"
    Então deve ser exibido a mensagem de erro "confirmation.notEqual"

