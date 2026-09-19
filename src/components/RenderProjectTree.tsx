import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import type {
  FileTreeItem,
  RenderProjectTreeProps,
} from "@/types/ProjectTreeTypes"
import { useNavigate } from "react-router-dom"

export function RenderProjectTree({
  journals,
  notes,
  projectName,
}: RenderProjectTreeProps) {
  const navigate = useNavigate()
  const fileTree: FileTreeItem[] = [
    {
      name: projectName,
      items: [
        {
          name: "Journals",
          items: journals,
        },
        {
          name: "Notes",
          items: notes,
        },
      ],
    },
  ]

  const renderItem = (fileItem: FileTreeItem) => {
    if ("items" in fileItem) {
      return (
        <Collapsible key={fileItem.name} defaultOpen>
          <CollapsibleTrigger
            render={
              <Button
                variant="ghost"
                size="default"
                className="group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground"
              >
                <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
                <FolderIcon />
                {fileItem.name}
              </Button>
            }
          />
          <CollapsibleContent className="style-lyra:ml-4 mt-1 ml-5">
            <div className="flex flex-col gap-1">
              {fileItem.items.map((child) => renderItem(child))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )
    }
    return (
      <Button
        key={fileItem.name}
        variant="link"
        size="default"
        className="w-full justify-start gap-2 text-foreground"
        onClick={() => navigate(`/${fileItem.path}`)}
      >
        <FileIcon />
        <span>{fileItem.name}</span>
      </Button>
    )
  }

  return (
    <Card className="h-full w-full max-w-[16rem] gap-2" size="default">
      <CardContent>
        <div className="flex flex-col gap-1">
          {fileTree.map((item) => renderItem(item))}
        </div>
      </CardContent>
    </Card>
  )
}
