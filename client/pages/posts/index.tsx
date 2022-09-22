import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

interface IPost {
  id: number;
  title: string;
  body: string;
}

const Posts: NextPage = ({ posts }: { posts: IPost[] }) => {
  return (
    <main className="py-4 flex flex-col items-start w-full">
      <h1 className="text-3xl mb-2">Posts Home page</h1>
      <section className="flex space-y-4 flex-col">
        {posts.slice(0, 20).map((post) => {
          return (
            <Link href={`/posts/${post.id}`} key={post.id}>
              <article className="p-3 shadow-md bg-white rounded-md cursor-pointer">
                <h1 className="text-blue-600 text-md capitalize mb-1 font-normal">
                  {post.title}
                </h1>
                <p>{post.body}</p>
              </article>
            </Link>
          );
        })}
      </section>
      <p></p>
    </main>
  );
};

export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  return {
    props: { posts },
  };
}

export default Posts;
