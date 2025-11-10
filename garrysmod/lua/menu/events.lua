cloud = cloud or {}
cloud.events = cloud.events or {}

-- todo
-- gamemode, map, addons, dupes, saves updates

local setLanguageEvent = "updateLanguage"
---@param lang string
function cloud.events.setLanguage(lang)
  local payload = { lang = lang }

  cloud:event("menu", setLanguageEvent, payload)
  cloud:event("console", setLanguageEvent, payload)
end

---@param level "debug" | "info" | "warn" | "error"
---@param message string
---@param prefix? string
function cloud.events.addConsoleLog(level, message, prefix)
  cloud:event("console", "log", { timestamp = os.time(), level = level, message = message, prefix = prefix })
end

function cloud.events.consoleClear()
  cloud:event("console", "clear", {})
end