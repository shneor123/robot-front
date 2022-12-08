const uploadImg = async (ev) => {

  const CLOUD_NAME = 'dxjt9fumq'
  const UPLOAD_PRESET = 'kvmv1bdp'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const formData = new FormData();
  formData.append('file', ev.target.files[0])
  formData.append('upload_preset', UPLOAD_PRESET)

  return fetch(UPLOAD_URL, {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(res => {
      return res
    })
    .catch(err => console.error(err))
}



export const uploadService = {
  uploadImg
}