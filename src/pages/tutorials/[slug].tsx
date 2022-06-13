import { allTutorials } from '@content';
import { BackButton, Container, Layout, Markdown, Seo } from '@site/components';
import { pick } from '@site/utils';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
});

export default function TutorialPage({
  tutorial,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Seo title={tutorial.title} description={tutorial.title} />
      <Container className="max-w-prose my-12">
        <BackButton />
        <div className="flex mt-2 items-start">
          <div className="flex-1">
            <h1 className="font-bold text-3xl">{tutorial.title}</h1>
            <span className="text-neutral font-semibold">
              {dateFormatter.format(new Date(tutorial.publishedAt))}
            </span>
          </div>
        </div>
        <Markdown content={tutorial.body.html} className="mt-4" />
      </Container>
    </Layout>
  );
}

export const getStaticPaths = () => ({
  paths: allTutorials.map(({ slug }) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  const { slug = '' } = params || {};
  const tutorial = allTutorials.find(tutorial => tutorial.slug === slug);
  if (!tutorial) {
    throw new Error(`Tutorial with slug ${slug} not found`);
  }
  return {
    props: {
      tutorial: pick(tutorial, ['title', 'body', 'publishedAt']),
    },
  };
};
