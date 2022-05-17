import Image from 'next/image';
import Link from 'next/link';
import { TechStackBar } from '@site/components';
import { Project } from '@site/types';

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="rounded-md group">
      <Link href={'/project/' + project.meta.slug} passHref>
        <a>
          <div className="group-hover:ring-offset-8 group-hover:ring-blue-400 dark:group-hover:ring-yellow-400 ring-2 rounded-md ring-transparent dark:ring-offset-black-primary transition-all">
            <Image
              src={'/images/projects' + project.meta.thumbnail}
              alt={project.meta.title}
              width={610}
              height={331}
              quality={100}
              loading="lazy"
              objectFit="contain"
              layout="responsive"
            />
          </div>
          <TechStackBar title={project.meta.title} technologies={project.meta.technologies} />
        </a>
      </Link>
    </div>
  );
};
