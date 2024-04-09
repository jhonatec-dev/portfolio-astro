import { paths } from "./paths";

export default function NavBar() {
  const pathname = window.location.pathname;
  console.log("PATHNAME --->", pathname);
  const divClasses: string[] = [];
  divClasses.push(
    " group flex gap-2 flex-col sm:flex-row justify-center items-center "
  );
  divClasses.push(
    " text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white "
  );
  divClasses.push(" p-2 ");

  const activeDivClasses: string[] = [];
  activeDivClasses.push(
    " text-cyan-400 dark:text-cyan-400 border-t-4 border-cyan-400 dark:border-cyan-400 "
  );
  activeDivClasses.push(" hover:text-cyan-500 dark:hover:text-cyan-400");

  function isPathActive(path: string): boolean {
    return pathname === path || (pathname.includes("projects") && path === "/");
  }

  function getDivClasses(path: string): string {
    if (isPathActive(path)) {
      return divClasses.concat(activeDivClasses).join("");
    }
    return divClasses.join("");
  }

  function getImgStyle(path: string) {
    if (isPathActive(path)) {
      return {
        filter:
          "invert(67%) sepia(73%) saturate(1167%) hue-rotate(146deg) brightness(102%) contrast(87%)",
        opacity: 1,
      };
    }
    return {};
  }

  return (
    <div className='flex justify-between sm:justify-center border-t-2 gap-0 sm:gap-2 w-full fixed bg-white dark:bg-stone-900 bottom-0 left-0 sm:relative sm:my-4'>
      {paths.map((path, index) => (
        <a key={index} href={path.url} style={{ marginTop: -3 }}>
          <div className={getDivClasses(path.url)}>
            <img
              src={`/assets/icons/${path.label.toLowerCase()}.svg`}
              alt={path.label}
              width={15}
              className={"opacity-50 dark:invert group-hover:opacity-100"}
              style={getImgStyle(path.url)}
            />
            <p className='text-sm sm:text-base'>{path.label}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
