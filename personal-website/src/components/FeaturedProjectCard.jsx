"use client";
import { Link } from 'react-router-dom';
import { CardContainer, CardBody, CardItem } from './ui/3d-card';

function FeaturedProjectCard({ project, index }) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-slate-900/80 relative group/card dark:hover:shadow-2xl dark:hover:shadow-cyan-500/[0.2] border-slate-700/50 w-auto sm:w-[30rem] h-auto rounded-xl p-6 border backdrop-blur-sm">
        <CardItem
          translateZ="50"
          className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
          Project {String(index + 1).padStart(2, '0')}
        </CardItem>
        
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-slate-100">
          {project.title}
        </CardItem>
        
        <CardItem
          as="p"
          translateZ="60"
          className="text-slate-300 text-sm max-w-sm mt-2">
          {project.blurb}
        </CardItem>
        
        <CardItem translateZ="100" rotateX={20} rotateZ={-10} className="w-full mt-4">
          <img
            src={project.cover}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl group-hover/card:shadow-cyan-500/20"
            alt={project.title}
          />
        </CardItem>
        
        <div className="flex justify-between items-center mt-6">
          <CardItem
            translateZ={20}
            translateX={-40}
            as={Link}
            to={`/work/${project.slug}`}
            className="px-4 py-2 rounded-xl text-xs font-normal text-slate-300 hover:text-cyan-400 transition-colors border border-slate-600 hover:border-cyan-500/50">
            View Project →
          </CardItem>
          
          {project.url && (
            <CardItem
              translateZ={20}
              translateX={40}
              as="a"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-bold hover:from-cyan-400 hover:to-purple-400 transition-all shadow-lg hover:shadow-cyan-500/25">
              Github
            </CardItem>
          )}
          
          {!project.url && (
            <CardItem
              translateZ={20}
              translateX={40}
              className="px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-500 text-xs font-bold cursor-not-allowed">
              Coming Soon
            </CardItem>
          )}
        </div>
      </CardBody>
    </CardContainer>
  );
}

export default FeaturedProjectCard; 