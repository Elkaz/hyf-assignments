const positiveWords = [
  "Joy",
  "Hope",
  "Kindness",
  "Success",
  "Love",
  "Gratitude",
  "Optimism",
  "Confidence",
  "Awesome",
  "Cheerful",
  "Delightful",
  "Excellent",
  "Fabulous",
  "Genius",
  "Happy",
  "Peaceful",
  "Thrilling",
  "super",
];

const negativeWords = [
  "Hate",
  "Unhappy",
  "Unkind",
  "Unfriendly",
  "Boring",
  "Untidy",
  "Problem",
  "Arrogant",
  "Nosy",
  "Lazy",
  "Pushy",
  "Mean",
  "Worthless",
  "Disgusted",
  "Pessimistic",
];

function getSentimentScore(stringSentence) {
  const words = stringSentence.toLowerCase().split(" ");
  const foundPositive = [];
  const foundNegative = [];

  for (i = 0; i < words.length; i++) {
    const word = words[i];
    if (positiveWords.map((w) => w.toLowerCase()).includes(word)) {
      foundPositive.push(word);
    }
    if (negativeWords.map((w) => w.toLowerCase()).includes(word)) {
      foundNegative.push(word);
    }
  }
  const score = foundPositive.length - foundNegative.length;

  return {
    score: score,
    foundPositive: foundPositive,
    foundNegative: foundNegative,
  };
}

console.log(getSentimentScore("I am mega super awesome happy"));
console.log(getSentimentScore("I hate doing boring stuff"));
console.log(getSentimentScore("Today is a delightful and peaceful day"));
console.log(getSentimentScore("I feel lazy and worthless"));
