require 'httparty'

module Helpers
  module TShield

    def start_session(name)
      @@current_session_name = name
      HTTParty.post $env['tshield']['sessions_url'], {query: {name: name}}
    end

    def stop_session
      @@current_session_name = nil
      HTTParty.delete $env['tshield']['sessions_url']
    end

    def current_session_name
      @@current_session_name if defined?(@@current_session_name)
    end

  end
end

