import type * as H from 'hast';
import {
  makeSource,
  defineDocumentType,
  ComputedFields,
} from 'contentlayer/source-files';
import readingTime from 'reading-time';
import rehypeAutoHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import rehypeShiki from '@re-taro/rehype-shiki';
import { getHighlighter } from 'shiki';
import { h } from 'hastscript';

const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: doc => doc._raw.sourceFileName.replace(/\.md$/, ''),
  },
};

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/*.md',
  fields: {
    featured: { type: 'boolean', required: true },
    draft: { type: 'boolean', default: true },
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    publishedAt: { type: 'date', default: new Date().toISOString() },
    cover: { type: 'json', required: true },
    tags: { type: 'list', required: true, of: { type: 'string' } },
  },
  computedFields: {
    ...computedFields,
    readingTime: {
      type: 'json',
      resolve: doc => readingTime(doc.body.raw),
    },
  },
}));

const Project = defineDocumentType(() => ({
  name: 'Project',
  computedFields,
  filePathPattern: 'projects/*.md',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    liveUrl: { type: 'string' },
    repoUrl: { type: 'string', required: true },
    thumbnail: { type: 'string', required: true },
    technologies: {
      type: 'list',
      required: true,
      of: {
        type: 'string',
      },
    },
  },
}));

const Snippet = defineDocumentType(() => ({
  name: 'Snippet',
  computedFields,
  filePathPattern: 'snippets/*.md',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    icon: { type: 'string', required: true },
    tags: { type: 'list', required: true, of: { type: 'string' } },
  },
}));

const Pages = defineDocumentType(() => ({
  name: 'Pages',
  fields: {},
  filePathPattern: '*.md',
}));

function customCodeBlock() {
  return async (tree: H.Root) => {
    const { visit } = await import('unist-util-visit');
    visit(tree, 'element', (node, _, parent) => {
      if (node.tagName !== 'code' || !parent) return;
      if (!('tagName' in parent)) return;
      if (parent.tagName !== 'pre') {
        node.properties ??= {};
        node.properties.className =
          'text-primary dark:bg-gray-800 bg-gray-200 rounded-md p-[1px] transition-colors';
        return;
      }
    });
  };
}

export default makeSource(async () => ({
  contentDirPath: 'content',
  documentTypes: [Post, Project, Snippet, Pages],
  onMissingOrIncompatibleData: 'fail',
  onExtraFieldData: 'fail',

  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutoHeadings,
        {
          content: h('span.inline.mr-1', '#'),
        },
      ],
      [
        rehypeShiki,
        { highlighter: await getHighlighter({ theme: 'one-dark-pro' }) },
      ],
      customCodeBlock,
    ],
  },
}));
