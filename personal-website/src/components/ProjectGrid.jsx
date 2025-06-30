import { projects } from '../data/projects'
import FeaturedProjectCard from './FeaturedProjectCard'

function ProjectGrid() {
  return (
    <section className="project-grid">
      <ul>
        {projects.map((p, index) => (
          <FeaturedProjectCard key={p.slug} project={p} index={index} />
        ))}
      </ul>
    </section>
  )
}

export default ProjectGrid 