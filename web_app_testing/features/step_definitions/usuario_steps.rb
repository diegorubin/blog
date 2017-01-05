Dado(/^que esteja no formulário de cadastro de usuário$/) do
  goto('/users/new')
end

Quando(/^eu adiciono o email "([^"]*)"$/) do |email|
  browser.text_field(name: 'email').set email
  
end

Quando(/^clico em "([^"]*)"$/) do |text|
  browser.button(text: text).click
end

Então(/^deve ser exibido a mensagem de erro "([^"]*)"$/) do |message|
  expect(browser.span(text: message).exists?).to be_truthy
end
