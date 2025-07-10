import React from "react";
import ProjectCard from "./ProjectCard";

const projects = [
  { title: "Aeon Raises $9.4M Seed", type: "Clients" },
  { title: "amp wins red dot design award", type: "Clients" },
  { title: "ComPsych Brand Website", type: "Launch" },
  { title: "Coachable Case Study", type: "New Work" },
];

const ProjectGrid = () => {
  return (
    <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 sm:px-12 py-12">
      {projects.map((project, idx) => (
        <ProjectCard key={idx} title={project.title} type={project.type} />
      ))}
    </section>
  );
};

export default ProjectGrid; 