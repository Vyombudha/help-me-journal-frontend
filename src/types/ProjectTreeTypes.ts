export type FileTreeItem =
  | {
      name: string
      path: string
    }
  | {
      name: string
      items: FileTreeItem[]
    }

export type RenderProjectTreeProps = {
  projectName: string
  journals: FileTreeItem[]
  notes: FileTreeItem[]
}
