import { IconName } from '@site/components';

export type MarkdownResult<T = Record<string, unknown>> = {
  content: string;
  readingTime: number;
  meta: {
    slug: string;
    id: string;
  } & T;
};

export type ProjectMeta = {
  title: string;
  liveUrl?: string;
  repoUrl: string;
  thumbnail: string;
  placeholder: string;
  technologies: IconName[];
};

export type PostMeta = {
  title: string;
  description: string;
  tags: string[];
  publishedAt: string;
  placeholder: string;
  cover: {
    path: string;
    width?: number;
    height?: number;
  };
};

export type Project = MarkdownResult<ProjectMeta>;

export type Post = MarkdownResult<PostMeta>;
