import { teas } from "./teas.js";

function teasByOrigin(teas) {
return teas.reduce((result, tea) => {
const origin = tea.origin;
 if (!result[origin]) {
      result[origin] = [];
 }
    result[origin].push(tea.name);

    return result;
}, {});

  }

console.log(teasByOrigin(teas));
