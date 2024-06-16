type Genre = {
  name: string;
  sectionTitle: string;
  limit: number;
}

const limit = 8;

export const genres: Genre[] =
  [
    {
      name: "Pop",
      sectionTitle: "Pop",
      limit,
    },
    {
      name: "Electronic",
      sectionTitle: "Eletrônica",
      limit,
    },
    {
      name: "Brazilian",
      sectionTitle: "Brasileira",
      limit,
    },
    {
      name: "Rock",
      sectionTitle: "Rock",
      limit,
    },
    {
      name: "Alternative",
      sectionTitle: "Alternativo",
      limit,
    },
    {
      name: "K-Pop",
      sectionTitle: "K-Pop",
      limit,
    },
  ]