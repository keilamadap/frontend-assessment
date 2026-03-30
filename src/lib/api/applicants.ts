import ky from "ky"

export const applicantsApi = ky.create({
  prefixUrl: `${process.env.APPLICANTS_API_URL}/v1`,
  headers: {
    "x-api-key": process.env.API_KEY,
  },
})
