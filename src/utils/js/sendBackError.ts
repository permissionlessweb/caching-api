export async function sendBackError(res: any, error: any) {
  const jsonError = error.toJSON();
  return await res.status(error?.toJSON().status ?? 404).send({
    errorText: 'NFT Info not available',
    error: {
      message: jsonError.message,
      name: jsonError.name,
      status: jsonError.status
    }
  });
}
