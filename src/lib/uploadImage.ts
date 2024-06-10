export async function uploadImage(fileToUpload: any) {
  const uploadFormData = new FormData()
  uploadFormData.set('file', fileToUpload)

  const formData = new FormData();

  formData.append('image', fileToUpload);
  formData.append('key', process.env.NEXT_PUBLIC_IMGBB_API_KEY as string);

  try {
    const uploadResponse = await fetch(
      'https://api.imgbb.com/1/upload',
      {
        method: 'POST',
        body: formData,
      }
    )

    const responseData = await uploadResponse.json();
    return responseData.data.url;
  } catch (error) {
    throw new Error(error as any);
  }
}