"use client";
import React from 'react';
import Link from 'next/link';
import NavBar from './components/NavBar';

function Page() {
  // Smooth scroll function
  const handleScroll = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Prevent the default anchor behavior
    const targetId = event.currentTarget.getAttribute('href'); // Get the target ID
  
    // Check if targetId is not null
    if (targetId) {
      const targetElement = document.querySelector(targetId) as HTMLElement; // Cast to HTMLElement
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop, 
          behavior: 'smooth', 
        });
      }
    }
  };
  
  

  return (
    <>
      {/* Navbar */}
      <nav>
        <NavBar />
      </nav>

      {/* Hero Section with Gradient Background */}
      <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-950 text-white text-center p-10">
        <h1 className="text-6xl font-bold mb-6">Master Complexity with Simplicity</h1>
        <p className="text-2xl mb-10">Streamline your rule evaluation process with clarity. Effortless rule management for modern developers.</p>
        <Link href="#links" onClick={handleScroll} className="bg-white text-black px-5 py-3 rounded-full text-lg transition-transform hover:scale-105 hover:bg-transparent hover:border hover:text-white">
          Get Started
        </Link>
      </section>

      {/* Links Section */}
      <div id='links'>
        {/* Key Functionalities and Benefits */}
        <div className="pt-10 text-white bg-gray-950 text-center">
          <h2 className="text-4xl font-bold mb-4">Key Functionalities and Benefits</h2>
          <p className="text-lg mb-1">Unlock the power of our Rule Engine with Abstract Syntax Tree, designed for efficient rule evaluation and visualization.</p>
        </div>

        <section className="h-screen bg-gray-950 text-white flex items-center justify-center">
          <div className="flex flex-col sm:flex-row sm:justify-center gap-6 w-[90vw]">
            <Link href="/ruleeval" className="bg-black p-8 rounded-md text-left shadow-lg shadow-gray-800 transition-transform transform hover:scale-105 h-64 flex flex-col justify-between hover:border-t-2 hover:border-l-2" target='_blank'>
              <div>
                <h3 className="text-2xl font-bold mb-8 pl-4">Rule Evaluation</h3>
                <p className="pl-4">Input custom rules and receive instant evaluation with high precision.</p>
              </div>
            </Link>
            <Link href="/visualrule" className="bg-black p-8 rounded-md text-left shadow-lg shadow-gray-800 transition-transform transform hover:scale-105 h-64 flex flex-col justify-between hover:border-t-2 hover:border-l-2" target='_blank'>
              <div>
                <h3 className="text-2xl font-bold mb-8 pl-4">Syntax Tree Visualization</h3>
                <p className="pl-4">Visualize complex rules with our intuitive syntax tree displays.</p>
              </div>
            </Link>
            <Link href="/combinerule" className="bg-black p-8 rounded-md text-left shadow-lg shadow-gray-800 transition-transform transform hover:scale-105 h-64 flex flex-col justify-between hover:border-t-2 hover:border-l-2" target='_blank'>
              <div>
                <h3 className="text-2xl font-bold mb-8 pl-4">Combine Rule</h3>
                <p className="pl-4">Consolidate multiple rules with ease, enhancing system compatibility.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-5 bg-black text-white text-center">
        <p>© 2024 Rule Engine. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Page;
