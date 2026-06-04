export type UnsplashPhotoUrls = {
  raw: string
  full: string
  regular: string
  small: string
  thumb: string
}

export type UnsplashUser = {
  id: string
  username: string
  name: string
  profile_image: {
    small: string
    medium: string
    large: string
  }
  links: {
    html: string
  }
}

export type UnsplashPhoto = {
  id: string
  width: number
  height: number
  color: string
  blur_hash: string
  description: string | null
  alt_description: string | null
  urls: UnsplashPhotoUrls
  user: UnsplashUser
  links: {
    html: string
    download: string
  }
}

export type UnsplashPhotosResponse = UnsplashPhoto[]

export type PhotosParams = {
  page?: number
  per_page?: number
}
