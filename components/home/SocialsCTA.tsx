export default function SocialsCTA() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-14 text-center">
      <p className="font-playfair text-xl text-purple-800 mb-6">
        Follow along on social media
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {[
          { label: "YouTube", href: "https://www.youtube.com/@evaheinemann7651/videos", color: "bg-red-600 hover:bg-red-700" },
          { label: "Facebook", href: "https://www.facebook.com/hidramas", color: "bg-blue-700 hover:bg-blue-800" },
          { label: "Twitter / X", href: "https://x.com/6_Second_Review", color: "bg-gray-900 hover:bg-black" },
        ].map(({ label, href, color }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${color} text-white font-lato text-sm font-semibold px-6 py-3 rounded-sm uppercase tracking-wide transition-colors shadow`}
          >
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}
