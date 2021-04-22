import projects from "./data"

export default function getHomePageProjects() {
    const data = [...projects]
    return data
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 4)
        .map((p) => ({ id: p.id, imageUrl: p.imageUrl, imageSize: p.imageSize, title: p.title }))
}

export function getRecommendedProjects() {
    const data = [...projects]
    return data
        .sort((a, b) => b.points - a.points)
        .slice(0, 6)
        .map((p) => ({ id: p.id, imageUrl: p.imageUrl, imageSize: p.imageSize, title: p.title }))
}

export function getAPIProjects(sortOrder, skip, limit) {
    const data = [...projects]

    if (sortOrder === "new") data.sort((a, b) => b.date.getTime() - a.date.getTime())
    else data.sort((a, b) => b.points - a.points)

    return data.slice(skip, skip + limit).map((p) => ({ id: p.id, imageUrl: p.imageUrl, imageSize: p.imageSize, title: p.title }))
}

export function getNumberOfProjects() {
    return projects.length
}

export function getAllProjectPaths() {
    const data = [...projects]
    return data.map((p) => ({
        params: {
            id: p.id,
        },
    }))
}

export function findProject(id) {
    const data = [...projects]

    const result = data.find((p) => p.id === id)
    const project = { ...result }
    project.date = project.date.toString()

    return project
}
