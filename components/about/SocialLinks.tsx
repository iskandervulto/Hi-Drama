const SOCIAL_LINKS = [
  {
    name: "YouTube",
    description: "Watch every episode on the Hi! Drama YouTube channel.",
    href: "https://www.youtube.com/@evaheinemann7651/videos",
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
    href: "https://www.facebook.com/hidramas",
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
    href: "https://x.com/6_Second_Review",
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

export default function SocialLinks() {
  return (
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
  );
}
