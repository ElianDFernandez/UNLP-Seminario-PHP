export const Apiget = (URL) => {
  return fetch(URL)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (Array.isArray(data)) {
        return data;
      } else {
        console.error("Data is not an array:", data);
      }
    });
};
