import axios from "axios"

const baseDomain = "http://127.0.0.1:8000"
const baseURL = `${baseDomain}/api`

const axiosIns = axios.create({
  baseURL,
  timeout: 10000
})

export { axiosIns }
