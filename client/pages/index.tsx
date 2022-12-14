import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-2xl font-bold text-blue-900">Hello world</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit rem
        reprehenderit aperiam doloribus nam necessitatibus tempora. Molestias,
        atque quibusdam! Quia.
      </p>
      <h2>Hello people</h2>
    </div>
  );
};

export default Home;
