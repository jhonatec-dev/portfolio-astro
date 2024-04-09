export const links = [
  {
    name: "GitHub",
    url: "https://github.com/jhonatec-dev",
  },
  {
    name: "HackerRank",
    url: "https://www.hackerrank.com/profile/jhonatec",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/jhonatec/",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/c/Jhonatec",
  },
];

class Reaction {
  name: string;
  constructor(algo: any) {
    this.name = "Reaction";
  }
}

function seePortfolio() {
  const URL = "https://jhonatec.dev";
  open(URL, "_blank");
  return new Reaction("awesome!");
}

seePortfolio();