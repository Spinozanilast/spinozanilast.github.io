import * as cheerio from "cheerio";

const res = await fetch("https://github.com/users/Spinozanilast/contributions");
const data = parseContribs(await res.text());
const cutOffDate = new Date(new Date().setDate(new Date().getDate() - 30));

const filteredData = data
    .filter((d) => d.date > cutOffDate && d.date < new Date())
    .sort(({ date: a }, { date: b }) => a.getDate() - b.getDate());

console.log(filteredData);

/**
 * Parses a GitHub contribution calendar HTML string and extracts contribution data.
 */
function parseContribs(html: string) {
    const ch = cheerio.load(html);
    const chTable = ch("table.ContributionCalendar-grid");
    if (!chTable.length) throw new Error("Can't find table.");
    const chDays = chTable.find("[data-date]");
    const data = chDays
        .map((_, el) => {
            const chDay = ch(el);
            const date = new Date(chDay.attr("data-date"));
            const level = parseInt(chDay.attr("data-level"), 10);
            return { date, level };
        })
        .get();
    return data;
}
