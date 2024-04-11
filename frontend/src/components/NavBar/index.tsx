import { paths } from "./paths.tsx";

export default function NavBar() {
  const pathname = window.location.pathname;
  // console.log("PATHNAME --->", pathname);
  const divClasses: string[] = [];
  divClasses.push(
    " group flex gap-0 sm:gap-3 p-1 flex-col sm:flex-row " +
      " justify-center items-center border-t-4 border-transparent "
  );
  const normalDiv =
    "text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white";

  const activeDiv =
    " text-cyan-400 dark:text-cyan-400 " +
    " hover:text-cyan-500 dark:hover:text-cyan-400 " +
    " border-cyan-400 dark:border-cyan-400 ";

  function isPathActive(path: string): boolean {
    if (path === "/") {
      return path === pathname || pathname.includes("/projects");
    } else {
      return pathname.includes(path);
    }
  }

  function getDivClasses(path: string): string {
    if (isPathActive(path)) {
      return divClasses.join("") + activeDiv;
    }
    return divClasses.join("") + normalDiv;
  }

  function getSVGClasses(path: string): string {
    const base = " w-7 h-7 ";
    if (isPathActive(path)) {
      return (
        base +
        " fill-cyan-400 group-hover:fill-cyan-500 dark:fill-cyan-400 dark:group-hover:fill-cyan-400"
      );
    }
    return (
      base +
      " fill-gray-500 group-hover:fill-black dark:fill-gray-400 dark:group-hover:fill-white"
    );
  }

  return (
    <div className='flex px-2 sm:justify-center z-50 border-t-2 gap-0 sm:gap-2 w-full fixed bg-white dark:bg-stone-900 bottom-0 left-0 sm:relative sm:mt-0 sm:mb-6'>
      {paths.map((path, index) => (
        <a
          key={index}
          href={path.url}
          style={{ marginTop: -3 }}
          className='flex-grow'
        >
          <div className={getDivClasses(path.url)}>
            <svg
              className={getSVGClasses(path.url)}
              viewBox={path.viewBox}
              xmlns='http://www.w3.org/2000/svg'
              xmlSpace='preserve'
            >
              {path.element}
            </svg>
            <p className='text-xs sm:text-base'>{path.label}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
