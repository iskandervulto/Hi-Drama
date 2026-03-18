import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-purple-950 border-t-4 border-gold-600 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid sm:grid-cols-3 gap-8 text-purple-300">
        {/* Brand */}
        <div>
          <p className="font-playfair text-2xl text-white font-bold mb-2">
            Hi! Drama
          </p>
          <p className="text-sm font-lato leading-relaxed">
            Theater reviews from the heart — because live theater
            deserves an audience.
          </p>
        </div>

        {/* Links */}
        <div>
          <p className="font-playfair text-gold-500 font-semibold mb-3 text-sm tracking-widest uppercase">
            Navigate
          </p>
          <ul className="space-y-2 text-sm font-lato">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/reviews"
                className="hover:text-white transition-colors"
              >
                Reviews
              </Link>
            </li>
            <li>
              <Link
                href="/show"
                className="hover:text-white transition-colors"
              >
                The Show
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <p className="font-playfair text-gold-500 font-semibold mb-3 text-sm tracking-widest uppercase">
            Follow Along
          </p>
          <ul className="space-y-2 text-sm font-lato">
            <li>
              <a
                href="https://www.youtube.com/@evaheinemann7651/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                YouTube
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/hidramas"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://x.com/6_Second_Review"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Twitter / X
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-purple-800 py-4 text-center text-xs text-purple-500 font-lato">
        © {new Date().getFullYear()} Hi! Drama. All rights reserved.
      </div>
    </footer>
  );
}
