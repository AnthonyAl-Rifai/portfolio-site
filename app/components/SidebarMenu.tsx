import React from "react";

type SidebarMenuProps = {
  onClose?: () => void;
};

const SidebarMenu: React.FC<SidebarMenuProps> = ({ onClose }) => {
  return (
    <aside className="fixed top-0 left-0 h-full w-80 bg-black text-white z-40 p-6 flex flex-col gap-8 shadow-lg">
      <button className="mb-4 text-left text-sm text-gray-400" onClick={onClose}>close</button>
      <div className="mb-8">
        <span className="font-bold text-xl">alRifai</span>
      </div>
      <nav className="flex flex-col gap-4">
        <a href="#" className="text-lg font-medium">Home</a>
        <a href="#" className="text-lg">About</a>
        <a href="#" className="text-lg">Work</a>
        <a href="#" className="text-lg">Contact</a>
      </nav>
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="bg-gray-900 rounded-lg p-4 text-center">Product Design</div>
        <div className="bg-gray-900 rounded-lg p-4 text-center">Branding Design</div>
        <div className="bg-gray-900 rounded-lg p-4 text-center">Design Systems</div>
        <div className="bg-gray-900 rounded-lg p-4 text-center">Website Design</div>
      </div>
      <div className="mt-auto text-xs text-gray-400">
        Contact us<br />
        <a href="mailto:hey@konpo.studio" className="underline">hey@konpo.studio</a>
      </div>
    </aside>
  );
};

export default SidebarMenu; 