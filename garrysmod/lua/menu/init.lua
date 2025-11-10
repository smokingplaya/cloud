local spawn = function()
  cloud:initialize()
end

timer.Simple(0, spawn)

concommand.Add("cloud_respawn", spawn)