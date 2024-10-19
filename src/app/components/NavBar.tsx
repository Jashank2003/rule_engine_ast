import Link from 'next/link';

const Navbar = () => {
  return (
    <>
    <nav className="flex justify-between items-center p-5 bg-transparent  text-white">
    <h1 className="text-3xl font-bold">Rule Engine</h1>
    <div>
      <Link href="/" className="mx-3 text-lg hover:underline hover:text-gray-400 duration-100">Home</Link>
      <Link href="/docpage" className="mx-3 text-lg hover:underline hover:text-gray-400 duration-100">Docs</Link>
    </div>
  </nav>
    </>
  );
};

export default Navbar;
