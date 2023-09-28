import React from "react";

const AddPoiFabIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    className="text-blue-600 w-6 h-6"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="12" y1="3" x2="12" y2="21" />
  </svg>
);

export default AddPoiFabIcon;
