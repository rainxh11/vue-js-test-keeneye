import { axiosIns } from "../plugins/axios"

const getRobots = async () => await axiosIns.get("/robots")

export { getRobots }
