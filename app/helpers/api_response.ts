export function responseWithPagination(response: any, content: any, extras: any = {}) {
  const result = content.toJSON ? content.toJSON() : content;

  return response.json({
    status: 'OK',
    result: result.data || [],
    pagination: {
      page: result.meta.currentPage,
      lastPage: result.meta.lastPage,
      total: result.meta.total,
      perPage: result.meta.perPage,
    },
    ...extras,
    error: null,
  });
}

export function responseWithSuccess(response: any, data?: any, extras?: any) {
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

export function responseWithError(response: any, message: any, ...extras: any) {
  console.log(message);

  return response.status(message.status).json({
    status: message.status,
    error: {
      message: message.message,
      code: message.code,

      ...extras,
    },
  });
}
