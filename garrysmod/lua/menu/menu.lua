local load = function()
  include("utils.lua")
  include("main.lua")
  include("shared.lua")
  include("events.lua")
  include("init.lua")
end

load()

concommand.Add("cloud_reload", load)