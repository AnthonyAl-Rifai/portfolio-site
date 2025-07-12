interface ProjectCardProps {
  id: number;
  title?: string;
  description?: string;
  imageUrl?: string;
  onViewProject?: (id: number) => void;
}

export default function ProjectCard({ 
  id, 
  title = "Project Title", 
  description = "Project description goes here...", 
  imageUrl,
  onViewProject 
}: ProjectCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg p-4 flex flex-col space-y-4">
      <div className="aspect-video bg-gray-200 rounded-md">
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover rounded-md"
          />
        )}
      </div>
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="h-4 bg-gray-300 rounded w-2/3" />
      <button 
        onClick={() => onViewProject?.(id)}
        className="self-start bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        View Project
      </button>
      <div className="bg-red-300 lg:bg-green-500 p-4">
        Resize me! I turn green at the `lg` breakpoint (1024px+)
      </div>
    </div>
  );
} 