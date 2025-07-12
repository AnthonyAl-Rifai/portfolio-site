interface InfoCardProps {
  navOpen: boolean;
  onNavItemClick?: (item: string) => void;
}

export default function InfoCard({ navOpen, onNavItemClick }: InfoCardProps) {
  const navItems = ["About", "Projects", "Experience", "Skills", "Contact"];

  return (
    <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20 shadow-sm">
      {!navOpen ? (
        <div>
          <h2 className="text-lg font-semibold mb-2">About Me</h2>
          <p className="text-sm text-gray-700">
            Full Stack Developer and composer passionate about building
            responsive and thoughtful user interfaces.
          </p>
        </div>
      ) : (
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => onNavItemClick?.(item)}
              className="w-full flex justify-between items-center px-4 py-2 text-left bg-white rounded-md border hover:bg-gray-50 transition"
            >
              <span>{item}</span>
              <span className="text-gray-400">{">"}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
} 


// {/* Grid Layout */}
// <div className="grid grid-cols-12 gap-4 px-6 py-6">
// {/* Sidebar Panel inside content */}
// <aside className="col-span-12 md:col-span-3">
//   <InfoCard 
//     navOpen={navOpen} 
//     onNavItemClick={handleNavItemClick}
//   />
// </aside>

// {/* Main Content */}
// <main className="col-span-12 md:col-span-9">
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//     {[1, 2].map((i) => (
//       <ProjectCard
//         key={i}
//         id={i}
//         onViewProject={handleViewProject}
//       />
//     ))}
//   </div>
// </main>