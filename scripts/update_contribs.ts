import * as cheerio from "cheerio";
import * as fs from "fs";

interface ContributionDay {
  date: Date;
  level: number;
  tooltipText: string | null;
}

const res = await fetch("https://github.com/users/Spinozanilast/contributions");
const data: ContributionDay[] = parseContribs(await res.text());

const daysMatrix: ContributionDay[][] = Array.from({ length: 6 }, (_, i) => {
  const start = i * 5;
  return data.slice(start, start + 5);
});

fs.writeFile(
  "../src/data/github-contribs.json",
  JSON.stringify(daysMatrix, null, 2),
  (err) => {
    if (err) throw err;
    console.log("Saved github-contribs.json");
  },
);

function parseContribs(html: string, cutoffDays: number = 30): ContributionDay[] {
  const cutOffDate = new Date(new Date().setDate(new Date().getDate() - cutoffDays));

  const ch = cheerio.load(html);
  const chTable = ch("table.ContributionCalendar-grid");
  if (!chTable.length) throw new Error("Can't find table.");
  const chDays = chTable.find("[data-date]");
  const contribsDates: {
    date: Date;
    level: number;
    id: string;
    tooltipText: string | null;
  }[] = chDays
    .map((_, el) => {
      const chDay = ch(el);
      const dateAttr = chDay.attr("data-date");
      const levelAttr = chDay.attr("data-level");
      const date = new Date(dateAttr!);
      const level = parseInt(levelAttr!);
      const id = chDay.attr("id") as string;
      return { date, level, id, tooltipText: null };
    })
    .get();

  const filteredDays = contribsDates
    .filter((d) => d.date > cutOffDate && d.date < new Date())
    .sort(({ date: a }, { date: b }) => a.getTime() - b.getTime());

  const tooltips = ch("tool-tip");

  for (let i = 0; i < filteredDays.length; i++) {
    const tooltip = tooltips.filter((_, el) => el.attribs.for === filteredDays[i].id);
    filteredDays[i].tooltipText = tooltip?.text() ?? null;
  }

  return filteredDays.map((day) => {
    return {
      date: day.date,
      level: day.level,
      tooltipText: day.tooltipText,
    };
  });
}
