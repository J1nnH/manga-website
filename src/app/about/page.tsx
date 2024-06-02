

export default function About() {
    return (
        <div className="bg-slate-900 text-white min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 py-10">
          <header className="text-center mb-10">
            <h1 className="text-4xl font-bold">About Rush B</h1>
          </header>
          <main className="bg-black p-6 rounded-lg shadow-md">
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Who We Are</h2>
              <p className="mb-4">Welcome to <strong>Rush B</strong>, your number one source for all things manga entertainment. We're dedicated to giving you the very best of manga content, with a focus on reliability, customer service, and uniqueness.</p>
              <p className="mb-4">Founded in 2024, Rush B has come a long way from its beginnings. When we first started out, our passion for providing the best manga content drove us to do intense research, and gave us the impetus to turn hard work and inspiration into a booming online platform. We now serve manga enthusiasts all over the world, and are thrilled to be a part of the vibrant and exciting world of manga entertainment.</p>
            </section>
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
              <p className="mb-4">Our mission is to deliver high-quality manga content that keeps you engaged and entertained. We aim to be the go-to destination for the latest and greatest in manga, ensuring that you always have something exciting to look forward to.</p>
            </section>
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">What We Offer</h2>
              <ul className="list-disc list-inside">
                <li className="mb-2">Latest manga releases and updates</li>
                <li className="mb-2">In-depth reviews and analysis</li>
                <li className="mb-2">Exclusive interviews with manga creators</li>
                <li className="mb-2">Engaging and interactive content</li>
                <li className="mb-2">Community discussions and forums</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
              <p className="mb-4">If you have any questions or comments, please don't hesitate to contact us. We're always happy to hear from our readers and fellow manga enthusiasts.</p>
              <p>Email: <a href="mailto:contact@rushb.com" className="text-blue-500">contact@rushb.com</a></p>
            </section>
          </main>
        </div>
      </div>
    );
}