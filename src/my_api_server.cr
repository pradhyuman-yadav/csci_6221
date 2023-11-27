# TODO: Write documentation for `MyApiServer`


require "kemal"
require "http/client"
require "http/request"

API_KEY = "49dc200001ba3f5857c6f59b91d54316"
WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather"

API_KEY_2 = "401449b6243b466292e164147232611"
WEATHER_API_BASE_URL = "api.weatherapi.com/v1"

# Serve static files from the 'public' directory
Kemal.config do |config|
  config.public_folder = "public"
end


module MyApiServer
  VERSION = "0.1.0"

  # Define a route for the root path
  get "/" do |env|
    # Render the HTML page
    render "public/index.html"
  end

  get "/hello" do |env|
    "Hello, World!"
  end

  post "/weather" do |env|

    body = env.request.body.try &.gets_to_end.to_s
    # Check if the body is empty
    if body.nil? || body.empty?
      env.response.status = HTTP::Status::BAD_REQUEST
      env.response.print "Bad Request: Latitude and longitude are required in the request body."
      next
    end

    # Parse latitude and longitude from the body
    latitude, longitude = body.split("&").map { |param| param.split("=")[1] }
    env.response.content_type = "application/json"

    print "here"
    print latitude
    print longitude


    # Make a request to the weather API
    # response = HTTP::Client.get("#{WEATHER_API_URL}?lat=#{latitude}&lon=#{longitude}&appid=#{API_KEY}")
    response = HTTP::Client.get("#{WEATHER_API_BASE_URL}/current.json?q=#{latitude}%2C#{longitude}&key=#{API_KEY_2}")


    print "Response code: \n"
    print response.status_code
    print "\n"

    # Check if the request was successful (HTTP status code 200)
    if response.status_code == 200
      weather_data = response.body.to_s
      env.response.content_type = "application/json"
      env.response.print weather_data
    else
      # env.response.status = response.status_code
      env.response.print "Error fetching weather data"
    end
  end

  post "/forecast" do |env|
    body = env.request.body.try &.gets_to_end.to_s
    if body.nil? || body.empty?
      env.response.status = HTTP::Status::BAD_REQUEST
      env.response.print "Bad Request: Latitude and longitude are required in the request body."
      next
    end

    latitude, longitude, date = body.split("&").map { |param| param.split("=")[1] }
    env.response.content_type = "application/json"
    response = HTTP::Client.get("#{WEATHER_API_BASE_URL}/forecast.json?q=#{latitude}%2C#{longitude}&dt=#{date}&key=#{API_KEY_2}")
    

    print "here"
    print latitude
    print longitude
    print "Response code: \n"
    print response.status_code
    print "\n"

    if response.status_code == 200
      weather_data = response.body.to_s
      env.response.content_type = "application/json"
      env.response.print weather_data
    else
      # env.response.status = response.status_code
      env.response.print "Error fetching weather data"
    end
  end

  post "/future" do |env|
    body = env.request.body.try &.gets_to_end.to_s
    if body.nil? || body.empty?
      env.response.status = HTTP::Status::BAD_REQUEST
      env.response.print "Bad Request: Latitude and longitude are required in the request body."
      next
    end

    latitude, longitude, date = body.split("&").map { |param| param.split("=")[1] }
    env.response.content_type = "application/json"
    response = HTTP::Client.get("#{WEATHER_API_BASE_URL}/future.json?q=#{latitude}%2C#{longitude}&dt=#{date}&key=#{API_KEY_2}")
    if response.status_code == 200
      weather_data = response.body.to_s
      env.response.content_type = "application/json"
      env.response.print weather_data
    else
      # env.response.status = response.status_code
      env.response.print "Error fetching weather data"
    end
  end

  post "/sail" do |env|
    body = env.request.body.try &.gets_to_end.to_s
    if body.nil? || body.empty?
      env.response.status = HTTP::Status::BAD_REQUEST
      env.response.print "Bad Request: Latitude and longitude are required in the request body."
      next
    end

    latitude, longitude, date = body.split("&").map { |param| param.split("=")[1] }
    env.response.content_type = "application/json"
    response = HTTP::Client.get("#{WEATHER_API_BASE_URL}/marine.json?q=#{latitude}%2C#{longitude}&dt=#{date}&key=#{API_KEY_2}")
    if response.status_code == 200
      weather_data = response.body.to_s
      env.response.content_type = "application/json"
      env.response.print weather_data
    else
      # env.response.status = response.status_code
      env.response.print "Error fetching weather data"
    end
  end

  post "/history" do |env|
    body = env.request.body.try &.gets_to_end.to_s
    if body.nil? || body.empty?
      env.response.status = HTTP::Status::BAD_REQUEST
      env.response.print "Bad Request: Latitude and longitude are required in the request body."
      next
    end

    latitude, longitude, date = body.split("&").map { |param| param.split("=")[1] }
    env.response.content_type = "application/json"
    response = HTTP::Client.get("#{WEATHER_API_BASE_URL}/history.json?q=#{latitude}%2C#{longitude}&dt=#{date}&key=#{API_KEY_2}")
    if response.status_code == 200
      weather_data = response.body.to_s
      env.response.content_type = "application/json"
      env.response.print weather_data
    else
      # env.response.status = response.status_code
      env.response.print "Error fetching weather data"
    end
  end



  # Start the Kemal server
  Kemal.run

end