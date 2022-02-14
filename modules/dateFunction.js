function getEndDay(day) {
  const iDay = Number(day);
  if (iDay > 3 && iDay < 21) return 'th';
  switch (iDay % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

function updateDate(element) {
  const dt = new Date();
  let month = dt.toLocaleString('en-US', { month: 'long' });
  const day = dt.toLocaleString('en-US', { day: 'numeric' });
  const endDay = getEndDay(day);
  const year = dt.toLocaleString('en-US', { year: 'numeric' });
  const time = dt.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' });
  month += ` ${day}${endDay} ${year}, ${time}`;
  element.textContent = month;
}

export default updateDate;