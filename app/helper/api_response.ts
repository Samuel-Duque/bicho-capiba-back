export function responseWithPagination(
  response: any,
  content: any,
  extras: any = {}
) {
  const result = content.toJSON ? content.toJSON() : content;

  return response.json({
    status: 'OK',
    result: result.data || [],
    pagination: {
      page: result.meta.current_page,
      lastPage: result.meta.last_page,
      total: result.meta.total,
      perPage: result.meta.per_page,
    },
    ...extras,
    error: null,
  });
}

export function responseWithSuccess(
  response: any,
  data?: any,
  extras?: any
) {
  if (typeof data === 'string') {
    data = { message: data };
  }

  return response.json({
    status: 'OK',
    result: data || null,
    ...extras,
    error: null,
  });
}



