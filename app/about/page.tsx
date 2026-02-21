import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Hi! Drama — the community theater review show on public access TV, YouTube, Facebook, and Twitter.",
};

const SOCIAL_LINKS = [
  {
    name: "YouTube",
    description: "Watch every episode on the Hi! Drama YouTube channel.",
    href: "https://youtube.com/@hidrama",
    color: "bg-red-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    description: "Join the conversation and see behind-the-scenes posts.",
    href: "https://facebook.com/hidrama",
    color: "bg-blue-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    description: "Quick takes, show announcements, and theater news.",
    href: "https://twitter.com/hidrama",
    color: "bg-gray-900",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Public Access TV",
    description: "Catch Hi! Drama on your local public access channel.",
    href: "#",
    color: "bg-purple-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM9 8l6 4-6 4V8z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="page-title">About Hi! Drama</h1>
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-gold-500" />
          <p className="text-gray-500 font-lato text-sm">
            Community theater, honestly reviewed
          </p>
        </div>
      </div>

      {/* Bio section */}
      <section className="bg-white border border-purple-100 shadow-sm rounded-sm p-8 mb-10">
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          {/* Placeholder portrait */}
          <div className="w-40 h-40 shrink-0 bg-purple-100 rounded-sm border-2 border-gold-400 flex items-center justify-center text-purple-300">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-16 h-16">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          <div>
            <h2 className="font-playfair text-2xl font-bold text-purple-900 mb-3">
              The Critic Behind the Camera
            </h2>
            <div className="space-y-3 text-gray-600 font-lato leading-relaxed">
              <p>
                Hi! Drama is a community theater review show dedicated to shining
                a light on the incredible talent found in local productions.
                Every performance — big or small, polished or raw — deserves an
                audience and a voice.
              </p>
              <p>
                Each review starts at the theater, continues on public access
                television, and lives here on this site forever so you can
                watch, read, and revisit anytime.
              </p>
              <p>
                Whether you&apos;re a lifelong theater-goer or just curious what&apos;s
                playing at your local community center, Hi! Drama is your guide
                to the stage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mb-12">
        <h2 className="font-playfair text-2xl font-bold text-purple-900 mb-6">
          How a Review Works
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              title: "Attend the Show",
              desc: "The critic attends a local community theater production and takes it all in.",
            },
            {
              step: "2",
              title: "Record the Episode",
              desc: "A video review airs on public access TV and is uploaded to YouTube.",
            },
            {
              step: "3",
              title: "Read & Watch Here",
              desc: "The video is embedded right on this page alongside a written review and a link to the Facebook post.",
            },
          ].map(({ step, title, desc }) => (
            <div
              key={step}
              className="bg-white border border-purple-100 rounded-sm p-5 shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-purple-800 text-white font-playfair font-bold text-lg flex items-center justify-center mb-3">
                {step}
              </div>
              <h3 className="font-playfair text-lg font-semibold text-purple-900 mb-2">
                {title}
              </h3>
              <p className="text-gray-500 font-lato text-sm leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Social links */}
      <section>
        <h2 className="font-playfair text-2xl font-bold text-purple-900 mb-6">
          Follow Hi! Drama
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {SOCIAL_LINKS.map(({ name, description, href, color, icon }) => (
            <a
              key={name}
              href={href}
              target={href === "#" ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white border border-purple-100 rounded-sm p-4 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div
                className={`${color} text-white w-12 h-12 rounded-sm flex items-center justify-center shrink-0`}
              >
                {icon}
              </div>
              <div>
                <p className="font-lato font-semibold text-charcoal group-hover:text-purple-800 transition-colors">
                  {name}
                </p>
                <p className="text-gray-400 text-xs font-lato mt-0.5">
                  {description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-12 text-center">
        <Link href="/reviews" className="btn-primary">
          Read the Reviews
        </Link>
      </div>
    </div>
  );
}
