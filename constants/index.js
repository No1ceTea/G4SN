export const sidebarLinks = [
  {
    imgURL: "/assets/home.svg",
    route: "/",
    label: "G4Hub",
  },
  {
    imgURL: "/assets/search.svg",
    route: "/search",
    label: "Recherche",
  },
  {
    imgURL: "/assets/heart.svg",
    route: "/activity",
    label: "Notifications",
  },
  {
    imgURL: "/assets/create.svg",
    route: "/create-thread",
    label: "Créez un Thread",
  },
  {
    imgURL: "/assets/community.svg",
    route: "/communities",
    label: "Communautés",
  },
  {
    route: "/calendar",
    label: "Calendrier",
  },
  {
    imgURL: "/assets/user.svg",
    route: "/profile",
    label: "Profil",
  },
];

export const profileTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "replies", label: "Réponses", icon: "/assets/members.svg" },
  { value: "tagged", label: "Tag", icon: "/assets/tag.svg" },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "members", label: "Membres", icon: "/assets/members.svg" },
  { value: "requests", label: "Demandes", icon: "/assets/request.svg" },
];
