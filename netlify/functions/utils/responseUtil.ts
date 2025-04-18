export const createJsonResponse = (statusCode: number, body: unknown) => {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  };
}
