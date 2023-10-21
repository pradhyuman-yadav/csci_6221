require "kemal"

get "/" do
  "Hello Pradhyuman!"
end

# Define a route that accepts input as a parameter
get "/hello/:name" do |env|
  name = env.params.url["name"]
  "Hello, #{name}!"
end

# Define a route for the map
get "/map" do |env|
  File.read("public/map.html")
end



Kemal.run