import Link from 'next/link';

export default function Navbar() {

  return (
    <nav className="flex w-full shadow-md bg-white py-3 px-4 flex-row justify-between items-baseline ">
      <h2 className="font-semibold text-2xl">Shirp</h2>
      <ul className="flex space-x-5">
        <Link href="/">
          <li className="navLink">Home</li>
        </Link>
        <Link href="/about">
          <li className="navLink">About</li>
        </Link>
        <Link href="/posts">
          <li className="navLink">Blog</li>
        </Link>
        <Link href="/checkout">
        <li className="navLink bg-blue-700 text-white px-2 rounded">
          Checkout
        </li>
        </Link>
      </ul>
    </nav>
  );
}
