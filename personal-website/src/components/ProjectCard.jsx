import { Link } from 'react-router-dom'

function ProjectCard({ project, index }) {
  return (
    <li className="project-card">
      <Link to={`/work/${project.slug}`}>
        <img src={project.cover} alt={project.title} />
        <div className="details">
          <div className="project-number">{String(index + 1).padStart(2, '0')}</div>
          <h3>{project.title}</h3>
          <p>{project.blurb}</p>
        </div>
      </Link>
    </li>
  )
}

export default ProjectCard