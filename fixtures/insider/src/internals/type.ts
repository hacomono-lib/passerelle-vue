export const tags = ['transition-log', 'data-sender', 'data-received-log', 'layout-view'] as const

export type TagName = (typeof tags)[number]

export type ApiType = 'optional' | 'composition'
