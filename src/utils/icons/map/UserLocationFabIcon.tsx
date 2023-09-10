import React from "react";

const UserLocationFabIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => (
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
    <path stroke="none" d="M0 0h24v24H0z" />
    <circle cx="12" cy="12" r="6" />
    <line x1="12" y1="4" x2="12" y2="6" />
    <line x1="12" y1="20" x2="12" y2="18" />
    <line x1="4" y1="12" x2="6" y2="12" />
    <line x1="20" y1="12" x2="18" y2="12" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

export default UserLocationFabIcon;
