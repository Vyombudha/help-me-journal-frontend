export type ContainerType = "JOURNAL" | "TECHNICAL_NOTE"
export type ProjectStatus = "IN_PROGRESS" | "COMPLETED" | "ABANDONED"
export type Mood =
  | "HAPPY"
  | "CALM"
  | "SAD"
  | "ANGRY"
  | "ANXIOUS"
  | "EXCITED"
  | "TIRED"
  | "NEUTRAL"

export interface UserDTO {
  id: string
  email: string
  name: string | null
  createdAt: string
  updatedAt: string
}

export interface ProjectDTO {
  id: string
  name: string
  description: string
  ownerId: string
  status: ProjectStatus
  createdAt: string
  updatedAt: string
}

export interface ContainerDTO {
  id: string
  title: string
  projectId: string
  type: ContainerType
  templateConfig: Record<string, unknown> | null
  moods: Mood[]
  createdAt: string
  updatedAt: string
}

// ---- Entry ----
export interface EntryDTO {
  id: string
  title: string
  content: string
  order: number
  containerId: string
  createdAt: string
  updatedAt: string
}

// ---- Create payloads (match *.schema.ts exactly) ----
export interface CreateProjectDTO {
  name: string
  description: string
}

export interface UpdateProjectDTO {
  newName: string
  newDescription: string
}

export interface CreateContainerDTO {
  title: string
  type: ContainerType
  moods: Mood[]
}

export interface UpdateContainerDTO {
  newTitle: string
  newMoods: Mood[]
}

export interface CreateEntryDTO {
  title: string
  content: string
}

export interface UpdateEntryDTO {
  newTitle: string
  newContent: string
}
export interface SuccessResponse<T> {
  success: true
  data: T
}
