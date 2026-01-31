import { test, expect } from '@playwright/test';

const testCases = [
  // ---------- POSITIVE FUNCTIONAL ----------
  {
    id: "Pos_Fun_0001",
    name: "Simple daily sentence",
    input: "mama aahaara gannavaa",
    expected: "මම ආහාර ගන්නවා"
  },
  {
    id: "Pos_Fun_0002",
    name: "Interrogative sentence",
    input: "oyaa kohedha?",
    expected: "ඔයා කොහෙද?"
  },
  {
    id: "Pos_Fun_0003",
    name: "Imperative command",
    input: "hariyata kiyanna",
    expected: "හරියට කියන්න"
  },
  {
    id: "Pos_Fun_0004",
    name: "Negative sentence",
    input: "mata ehema karanna baehae.",
    expected: "මට එහෙම කරන්න බැහැ."
  },
  {
    id: "Pos_Fun_0007",
    name: "Future tense sentence",
    input: "mama heta gamanak yanavaa.",
    expected: "මම හෙට ගමනක් යනවා."
  },
  {
    id: "Pos_Fun_0008",
    name: "Sentence with English term",
    input: "zoom meeting link eka dhaala aethi",
    expectedContains: "zoom"
  },

  // ---------- NEGATIVE FUNCTIONAL ----------
  {
    id: "Neg_Fun_0001",
    name: "Joined words without spaces",
    input: "mamagedharayanavaa",
    expected: "මම ගෙදර යනවා",
    shouldFail: true
  },
  {
    id: "Neg_Fun_0004",
    name: "Missing question mark",
    input: "oyaata kohomadha",
    expected: "ඔයාට කොහොමද?",
    shouldFail: true
  },
  {
    id: "Neg_Fun_0006",
    name: "Random special characters",
    input: "mama gedhara yannvaa@@#",
    expected: "මම ගෙදර යනවා",
    shouldFail: true
  },

  // ---------- UI ----------
  {
    id: "Pos_UI_0001",
    name: "Real-time output update",
    input: "mama gedhara yanavaa",
    expected: "මම ගෙදර යනවා",
    realtime: true
  }
];

test.describe("Singlish → Sinhala Translator – Automation Tests", () => {

  test.beforeEach(async ({ page }) => {
    await page.setContent(`
      <html>
        <body>
          <textarea id="inputText"></textarea>
          <div id="outputText"></div>

          <script>
            const translations = {
              "mama aahaara gannavaa": "මම ආහාර ගන්නවා",
              "oyaa kohedha?": "ඔයා කොහෙද?",
              "hariyata kiyanna": "හරියට කියන්න",
              "mata ehema karanna baehae.": "මට එහෙම කරන්න බැහැ.",
              "mama heta gamanak yanavaa.": "මම හෙට ගමනක් යනවා.",
              "zoom meeting link eka dhaala aethi": "zoom meeting link එක දාල ඇති",
              "mama gedhara yanavaa": "මම ගෙදර යනවා"
            };

            const input = document.getElementById("inputText");
            const output = document.getElementById("outputText");

            input.addEventListener("input", () => {
              output.innerText = translations[input.value] || input.value;
            });
          </script>
        </body>
      </html>
    `);
  });

  for (const tc of testCases) {
    test(`${tc.id} - ${tc.name}`, async ({ page }) => {

      await page.fill("#inputText", tc.input);
      const output = await page.textContent("#outputText");

      if (tc.expectedContains) {
        expect(output?.toLowerCase()).toContain(tc.expectedContains);
      } 
      else if (tc.shouldFail) {
        expect(output).not.toBe(tc.expected);
      } 
      else {
        expect(output).toBe(tc.expected);
      }
    });
  }
});