function longestPalindrome(string) {
  if (string.length < 2) return string;

  let start = 0;
  let maxLength = 1;

  function expandFromCenter(right, left) {
    while (
      left >= 0 &&
      right < string.length &&
      string[left] === string[right]
    ) {
      right++;
      left--;
    }
    const length = right - left -1;
    if (length > maxLength) {
      maxLength = length;
      start = left + 1;
    }
  }
  for (let i = 0; i < string.length; i++) {
    expandFromCenter(i, i);
    expandFromCenter(i, i + 1);
  }
  return string.substring(start, start + maxLength);
}


console.log(longestPalindrome("abccbafghhgf"));
console.log(longestPalindrome("yuhgfddfghyunhgfrt"));

