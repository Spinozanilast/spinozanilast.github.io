export interface Project {
  index: number;
  title: string;
  tagline: string;
  details: string;
  tech: string[];
  link: string;
  logoLink: string;
  topBannerHtml?: string;
  bottomBannerHtml: string;
  year: string;
  siteLink?: string;
  starsCount?: number;
}

export const projects: Project[] = [
  {
    index: 1,
    title: "Flow Launcher Plugin",
    tagline: "AppsSnapshoter",
    details:
      "A Flow Launcher plugin that captures your currently running (windowed) apps into **named snapshots**, so you can restore your whole **working setup** later in a couple of **keystrokes**. Snapshots can be listed, renamed, removed, and apps inside them can be replaced or blocked from ever being snapshotted again.",
    tech: ["C#", "WPF", "Flow Launcher"],
    link: "https://github.com/Spinozanilast/Flow.Launcher.Plugin.AppsSnapshoter",
    logoLink:
      "https://raw.githubusercontent.com/Spinozanilast/Flow.Launcher.Plugin.AppsSnapshoter/refs/heads/master/snapshot.png",
    bottomBannerHtml: `
        <h1>Plugin for</h1>
        <a href="https://www.flowlauncher.com" target="_blank" class="link arrow"><img src="https://www.flowlauncher.com/_astro/logo.0UvRGS8B_2rd06f.avif" alt="Flow launcher icon" /></a>
      `,
    year: "2024",
    starsCount: 4,
  },
  {
    index: 2,
    title: "Aseprite Assets CLI",
    tagline: "aseprite-assets-cli",
    details:
      "A Go CLI for a better experience with Aseprite assets. List existing **sprites** and **palettes**, create new ones, **preview them right in the terminal**, and export them by format or template path with optional scales or sizes. Flags are interchangeable with **interactive surveys**.",
    tech: ["Go", "Cobra", "Viper"],
    link: "https://github.com/Spinozanilast/aseprite-assets-cli",
    logoLink:
      "https://raw.githubusercontent.com/Spinozanilast/aseprite-assets-cli/master/www/static/logo128.png",
    bottomBannerHtml: `
        <h1>Export helper for Aseprite</h1>
        <a href="https://www.aseprite.org" target="_blank" class="link arrow"><img src="https://raw.githubusercontent.com/aseprite/aseprite/refs/heads/main/data/icons/ase128.png" alt="Aseprite icon" /></a>
      `,
    year: "2025",
    starsCount: 2,
  },
  {
    index: 3,
    title: "Wikie",
    tagline: "wikie",
    details:
      "A web extension that surfaces the **wiki resources** you need on the gaming pages you visit. It adds **Wikipedia** and **SteamDB** badges to Steam store and SteamDB app pages, supports independent wikis, syncs its theme with your browser, and lets you **pin the panel** to any corner of the screen.",
    tech: ["TypeScript", "React", "WXT"],
    link: "https://github.com/Spinozanilast/wikie",
    logoLink:
      "https://raw.githubusercontent.com/Spinozanilast/wikie/main/public/icon/128.png",
    topBannerHtml: `
      <img src="https://raw.githubusercontent.com/Spinozanilast/wikie/refs/heads/main/.github/assets/banner.jpg" alt="Wikie banner image" />
      `,
    bottomBannerHtml: `
        <h1>Browser extension for</h1>
        <a href="https://store.steampowered.com" target="_blank" class="link arrow"><img src="https://store.steampowered.com/favicon.ico" alt="Steam icon" /></a>
      `,
    year: "2026",
    siteLink: "https://wikie-website.vercel.app",
  },
];
