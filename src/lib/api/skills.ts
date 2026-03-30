import ky from "ky"

export const skillsApi = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
})
