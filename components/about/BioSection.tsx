export default function BioSection() {
  return (
    <section className="bg-white border border-purple-100 shadow-sm rounded-sm p-8 mb-10">
      <div className="flex flex-col sm:flex-row gap-8 items-start">
        {/* Logo */}
        <img
          src="/theater-masks.jpg"
          alt="Hi! Drama theater masks logo"
          className="w-40 h-40 shrink-0 rounded-sm border-2 border-gold-400 object-cover"
        />

        <div>
          <h2 className="font-playfair text-2xl font-bold text-purple-900 mb-3">
            The Critic Behind the Camera
          </h2>
          <div className="space-y-3 text-gray-600 font-lato leading-relaxed">
            <p>
              Hi! Drama is a theater review show dedicated to shining
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
  );
}
