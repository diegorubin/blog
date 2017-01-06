Dado(/^que esteja no formulário de cadastro de usuário$/) do
  goto('/users/new')
end

Quando(/^eu adiciono o email "([^"]*)"$/) do |email|
  browser.text_field(name: 'email').set email
  
end

Quando(/^clico em "([^"]*)"$/) do |text|
  browser.button(text: text).click
end

Quando(/^eu insiro a senha "([^"]*)"$/) do |password|
  browser.text_field(name: 'password').set password
end

Quando(/^eu insiro na confirmação da senha "([^"]*)"$/) do |password|
  browser.text_field(name: 'password_confirmation').set password
end

Então(/^deve ser exibido a mensagem de erro "([^"]*)"$/) do |message|
  expect(browser.span(text: message).exists?).to be_truthy
end
