require 'rspec'
require "watir-webdriver"
require 'selenium-webdriver'
require 'yaml'
require 'httparty'
require File.join(File.dirname(__FILE__), 'helpers', 'navigation')
require File.join(File.dirname(__FILE__), 'helpers', 'tshield')

file_content = 
  File.new("#{File.dirname(__FILE__)}/../../config/application.yml").read
$env = YAML.load(file_content)[ENV['APP_ENV'] || 'local']

# includes
include Helpers::Navigation
include Helpers::TShield

Before do |s|
  @skip_change_session = false
end

After do |s|
  stop_session unless @skip_change_session
end

