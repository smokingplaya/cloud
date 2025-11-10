cloud = cloud or {}
cloud.utils = cloud.utils or {}

---@param name string
---@param payload table
---@return string JS code
function cloud.utils.convertEventToJS(name, payload)
  local jsoned = util.TableToJSON(payload)

  local eventCode = ("new CustomEvent('" .. name .. "', { detail: " .. jsoned .. " })")

  return ("window.dispatchEvent(" .. eventCode .. ")")
end

---@param panel Cloud.Panel
---@param url string
---@return DHTML
function cloud.utils.newHtml(panel, url)
  local panel = vgui.Create("DHTML")
  panel:Dock(FILL)
  panel:AddFunction("lua", "call", function(fname, ...)
    return cloud:call(panel, name, ...)
  end)

  return panel
end