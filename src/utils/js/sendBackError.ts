export async function sendBackError(res: any ,error:any){
  return await res.status(error?.toJSON().status ?? 404).send({
      errorText: "NFT Info not available",
      error,
    });
}