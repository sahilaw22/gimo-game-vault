export interface CredentialItem {
  id?: string;
  game: string;
  account: string;
  password?: string;
  email?: string;
  emailPass?: string;
  extra?: string;
  tags: string[];
  bannerUrl?: string;
  isFavorite?: boolean;
}

export const defaultCredentials: CredentialItem[] = [
  {
    game: "GTA V Online",
    account: "DemoGamer_GTA5",
    password: "DemoPass#GTA2026",
    email: "gta5.demo@gimo-vault.io",
    emailPass: "MailPass#GTA99",
    extra: "Level 250 • $50M Cash",
    tags: ["rockstar"],
    bannerUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg",
    isFavorite: true
  },
  {
    game: "Cyberpunk 2077",
    account: "V_NightCity_2077",
    password: "Choom@NightCity#2077",
    email: "v.cyberpunk@gimo-vault.io",
    emailPass: "ArasakaVault#902",
    extra: "Phantom Liberty DLC Included",
    tags: ["steam", "epic"],
    bannerUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg",
    isFavorite: true
  },
  {
    game: "Red Dead Redemption 2",
    account: "ArthurMorgan_Outlaw",
    password: "WildWest#RDR2026",
    email: "rdr2.demo@gimo-vault.io",
    emailPass: "OutlawMail#77",
    extra: "100% Story Completion",
    tags: ["rockstar", "steam"],
    bannerUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg",
    isFavorite: true
  },
  {
    game: "Elden Ring",
    account: "Tarnished_EldenHero",
    password: "Erdtree#Elden2026",
    email: "eldenring.demo@gimo-vault.io",
    emailPass: "TarnishedMail#33",
    extra: "Shadow of the Erdtree Ready",
    tags: ["steam"],
    bannerUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg",
    isFavorite: true
  }
];
