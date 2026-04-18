type ConstructQueryParams = {
  searchParams: URLSearchParams;
  fields?: string[];
  keys?: string[];
  page: number;
  limit: number;
};

export function constructQuery({
  searchParams,
  fields,
  keys,
  page,
  limit,
}: ConstructQueryParams): string {
  const queryParams: string[] = [];

  if (keys?.length) {
    keys.forEach((key) => {
      const value = searchParams.get(key);
      if (value && value !== 'all') {
        queryParams.push(`${key}=${value}`);
      }
    });
  }

  if (fields?.length) {
    queryParams.push(`fields=${fields.join(',')}`);
  }

  if (page) {
    queryParams.push(`page=${page}`);
  }

  if (limit) {
    queryParams.push(`limit=${limit}`);
  }

  return queryParams.join('&');
}
