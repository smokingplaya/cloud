---@alias Cloud.Panel "menu" | "console"

-- todo
cloud = cloud or {
  api = {
    loaded = false,
    version = 0,
    requiredVersion = 1
  },

  ---@type table<Cloud.Panel, string[]>
  delayed = { menu = {}, console = {} },
  declared = {}
}

if (util.IsBinaryModuleInstalled("cloud_api")) then
  require("cloud_api")
  -- no need in this because of cloud-api module automaticlly updates it
  -- cloud.api.loaded = true
end

if (cloud.api.version < cloud.api.requiredVersion) then
  gui.ShowConsole()

  print("[cloud] You are using an outdated version of cloud-api (current " .. cloud.api.version .. ", required " .. cloud.api.requiredVersion .. ")")
  print("\tGet it here: https://github.com/smokingplaya/cloud-api")
end

---@param name Cloud.Panel
function cloud:spawn(name, url)
  if (IsValid(self[name])) then
    self[name]:Remove()
  end

  local panel = self.utils.newHtml(name, url)
  self[name] = panel

  for _, event in ipairs(self.delayed) do
    panel:QueueJavascript(event)
  end
end

function cloud:initialize()
  self:spawn("menu", "")

  if (self.api.loaded) then
    self:spawn("console", "")
  end
end

---@param panel Cloud.Panel
---@param name string
---@param payload table
function cloud:event(panel, name, payload)
  local event = cloud.utils.convertEventToJS(name, payload)

  if (not IsValid(self[panel])) then
    self.delayed[panel][#self.delayed[panel]+1] = event
  end

  self[panel]:QueueJavascript(event)
end

---@param name string
---@param method fun(_: DHTML)
function cloud:declare(name, method)
  self.declared[name] = method
end

---@private
---@param panel Cloud.Panel
---@param name string
---@vararg any
function cloud:call(panel, name, ...)
  local callback = self.declared[name]

  if (!callback) then
    return "__err__", "unknown function `" .. tostring(name) .. "`"
  end

  local isOk, result = pcall(callback, self[panel], ...)

  if (isOk) then
    return "__ok__", result
  end

  return "__err__", "runtime error: " .. tostring(result)
end