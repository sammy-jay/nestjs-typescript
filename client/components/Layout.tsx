import Navbar from '../components/Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="p-4">{children}</main>
    </>
  );
}
