import { useParams } from 'react-router-dom'
import { projects } from '../data/projects'

function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return <main className="page-content">Project not found</main>
  }

  return (
    <main className="project-detail">
      <h1>{project.title}</h1>
      
      {project.meta && (
        <div className="project-meta">
          {project.meta.role && (
            <div className="project-meta-item">
              <span className="project-meta-label">Role: </span>
              <span className="project-meta-value">{project.meta.role}</span>
            </div>
          )}
          {project.meta.timeline && (
            <div className="project-meta-item">
              <span className="project-meta-label">Timeline: </span>
              <span className="project-meta-value">{project.meta.timeline}</span>
            </div>
          )}
          {project.meta.tools && (
            <div className="project-meta-item">
              <span className="project-meta-label">Tools: </span>
              <span className="project-meta-value">{project.meta.tools}</span>
            </div>
          )}
        </div>
      )}
      
      <img src={project.cover} alt={project.title} />
      
      <p>{project.description || project.blurb}</p>
      
      {project.url && (
        <p>
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            Visit live ↗
          </a>
        </p>
      )}
    </main>
  )
}

export default ProjectDetail
