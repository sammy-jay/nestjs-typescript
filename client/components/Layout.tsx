import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="p-4">{children}</main>
    </>
  );
}
