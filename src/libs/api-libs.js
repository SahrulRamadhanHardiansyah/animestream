export const getAnimeResponse = async (sources, resource, query) => {
  const url = `${process.env.NEXT_PUBLIC_WAJIK_API_URL}/${sources}/${resource}${query ? `/${query}` : ""}`;
  console.log("Fetching:", url); // debug log
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const getNestedAnimeResponse = async (sources, resource, objectProperty) => {
  const response = await getAnimeResponse(sources, resource, objectProperty);
  if (!data?.data) return [];

  return response.data.flatMap((item) => item[objectProperty] ?? []);
};
