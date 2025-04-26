import { ToggleTheme } from "./Themes/ToggleTheme";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-3 sm:p-4 ">
      <div className="flex items-center space-x-2">
        <img src="logo.svg" alt="Logo" className="size-8 sm:size-10" />
        <p className="text-xl sm:text-2xl font-semibold">Humanchain</p>
      </div>
      <ToggleTheme />
    </nav>
  );
}
