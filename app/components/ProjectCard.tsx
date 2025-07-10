import React from "react";

type ProjectCardProps = {
  title: string;
  type: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ title, type }) => {
  return (
    <div className="bg-black text-white rounded-xl p-6 flex flex-col justify-end min-h-[180px] shadow-md hover:scale-[1.03] transition-transform cursor-pointer">
      <span className="text-xs text-gray-400 mb-2">{type}</span>
      <span className="text-lg font-semibold leading-tight">{title}</span>
    </div>
  );
};

export default ProjectCard; 