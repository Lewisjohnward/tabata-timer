export const truncateTitle = (title: string) => {
  if (!title.includes(" ") && title.length > 15)
    return `${title.slice(0, 15)}...`;
  else if (title.length > 50) return `${title.slice(0, 50)}...`;
  else return title;
};
