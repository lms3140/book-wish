import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBookStore } from "@/store/bookStore";
import { useSidePanelStore, type SidePanelMode } from "@/store/sidePanelStore";
import { BookAddForm } from "./form/BookAddForm";
import { BookEditForm } from "./form/BookEditForm";

const titleMapping: Record<SidePanelMode, string> = {
  edit: "수정",
  add: "등록",
};

const titleColorMapping: Record<SidePanelMode, string> = {
  edit: "text-amber-700 dark:text-amber-300",
  add: "text-primary-foreground dark:text-primary",
};

function renderPanelContent(panelMode: SidePanelMode) {
  switch (panelMode) {
    case "add":
      return <BookAddForm />;
    case "edit":
      return <BookEditForm />;
    default:
      return null;
  }
}

function renderPanelActions(
  panelMode: SidePanelMode,
  setPanelMode: (mode: SidePanelMode) => void,
  hasSelectedBook: boolean,
) {
  switch (panelMode) {
    case "edit":
      return <Button onClick={() => setPanelMode("add")}>등록으로 전환</Button>;
    case "add":
      return (
        <Button
          onClick={() => setPanelMode("edit")}
          disabled={!hasSelectedBook}
        >
          수정으로 전환
        </Button>
      );
    default:
      return null;
  }
}

export function BookSidePanel() {
  const panelMode = useSidePanelStore((state) => state.mode);
  const setPanelMode = useSidePanelStore((state) => state.setMode);
  const hasSelectedBook = useBookStore((state) => !!state.book);

  return (
    <div>
      <Card className="border-primary/15 bg-linear-to-br from-card to-primary/4">
        <CardHeader className="items-center border-b border-border/60 pb-4">
          <CardTitle
            className={`${titleColorMapping[panelMode]} text-base font-bold`}
          >
            {titleMapping[panelMode]}
          </CardTitle>
          <CardAction>
            {renderPanelActions(panelMode, setPanelMode, hasSelectedBook)}
          </CardAction>
        </CardHeader>
        <CardContent className="pt-1">
          {renderPanelContent(panelMode)}
        </CardContent>
      </Card>
    </div>
  );
}
