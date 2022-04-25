import { Project } from '@site/types';
import { TechIcon } from './Icons';
import { Markdown } from './Markdown';

const aboutTechs = [
  {
    name: 'typescript' as const,
    className: 'absolute md:block hidden motion-safe:animate-bounce top-24 right-24',
  },
  {
    name: 'javascript' as const,
    className: 'absolute md:block hidden motion-safe:animate-bounce top-24 left-24',
  },
  {
    name: 'node_js' as const,
    className: 'absolute md:block hidden motion-safe:animate-bounce bottom-24 left-24',
  },
  {
    name: 'graphql' as const,
    className: 'absolute md:block hidden motion-safe:animate-bounce bottom-24 right-24',
  },
];

export function Intro({ data }: { data: Pick<Project, 'html'> }) {
  return (
    <div
      className="bg-gray-800 min-h-screen flex flex-col items-center justify-center relative md:py-8 py-4"
      id="intro"
    >
      <h1 className="uppercase font-bold md:text-3xl text-lg text-center">About Me</h1>
      <Markdown html={data.html} className="md:mx-auto my-4 mx-4" />
      {aboutTechs.map((tech) => (
        <TechIcon key={tech.name} {...tech} size={32} />
      ))}
    </div>
  );
}
