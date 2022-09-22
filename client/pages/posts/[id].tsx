import type { NextPage } from 'next';


interface IPost {
  id: number;
  title: string;
  body: string;
}

const Post: NextPage = ({ post }: { post: IPost }) => {
  return (
    <main className="p-4 flex flex-col items-start w-full">
      <h1 className="text-3xl mb-2">Post {post.id}</h1>
      <section className="flex space-y-4 flex-col">
        <article className="p-3 shadow-md bg-white rounded-md cursor-pointer">
          <h1 className="text-blue-600 text-md capitalize mb-1 font-normal">
            {post.title}
          </h1>
          <p>{post.body}</p>
        </article>
      </section>
      <p></p>
    </main>
  );
};

export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts: IPost[] = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
  );

  const post = await res.json();

  return {
    props: { post },
  };
}

export default Post;
