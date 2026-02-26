export default function Footer() {
  return (
    <footer className="px-6 md:px-12 py-8 border-t border-[#1e1e1e]">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-[Urbanist] text-[10px] tracking-[0.15em] uppercase text-[#404040]">
          &copy; {new Date().getFullYear()} Peter Iskander
        </p>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group font-[Urbanist] text-[10px] tracking-[0.15em] uppercase text-[#404040] hover:text-[#808080] transition-colors duration-300 bg-transparent border-none cursor-pointer flex items-center gap-2"
        >
          Back to top
          <span className="group-hover:-translate-y-0.5 transition-transform duration-300 inline-block">
            &uarr;
          </span>
        </button>
      </div>
    </footer>
  );
}
