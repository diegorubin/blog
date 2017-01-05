require "watir-webdriver"

module Helpers
  module Navigation

    def browser
      @@browser ||=  Watir::Browser.new $env['browser']
    end

    def goto(path)
      browser.goto("#{$env['protocol']}://#{$env['host']}:#{$env['port']}#{path}")
    end

  end
end

