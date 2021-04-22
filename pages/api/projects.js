import { getAPIProjects, getNumberOfProjects } from "../../library/operations"

export default (req, res) => {
    const sortOrder = req.query["sort_order"] === "recommended" ? "recommended" : "new"

    const numberOfPages = Math.floor(getNumberOfProjects() / 6) + 1
    const page = req.query["page"] > 1 || req.query["page"] <= numberOfPages ? req.query["page"] : 1

    const projects = getAPIProjects(sortOrder, (page - 1) * 6, 6)

    res.status(200).json(projects)
}
