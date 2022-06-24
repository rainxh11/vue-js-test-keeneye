import Vue from "vue"
import "datejs"

Vue.filter(
  "formatDate",
  (value: string | number, filterFormat = "dd-MM-yyyy") => {
    return formatDate(value, filterFormat)
  }
)

export function formatDate(value: string | number, filterFormat: string) {
  if (value) {
    return new Date(value).toString(filterFormat)
  }

  return ""
}
