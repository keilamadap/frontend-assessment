export const queryKeys = {
  skills: {
    all: ["skills"] as const,
    list: (params?: Record<string, string>) =>
      params ? (["skills", "list", params] as const) : (["skills", "list"] as const),
  },
}
