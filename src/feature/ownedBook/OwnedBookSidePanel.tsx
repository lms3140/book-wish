import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useOwnedBookStore,
  type OwnedBookSidePanelMode,
} from "@/store/ownedBookStore";
import { OwnedBookAddForm } from "./form/OwnedBookAddForm";
import { OwnedBookEditForm } from "./form/OwnedBookEditForm";

const titleMapping: Record<OwnedBookSidePanelMode, string> = {
  edit: "수정",
  add: "등록",
};

const titleColorMapping: Record<OwnedBookSidePanelMode, string> = {
  edit: "text-amber-700 dark:text-amber-300",
  add: "text-primary-foreground dark:text-primary",
};

function renderPanelContent(panelMode: OwnedBookSidePanelMode) {
  switch (panelMode) {
    case "add":
      return <OwnedBookAddForm />;
    case "edit":
      return <OwnedBookEditForm />;
    default:
      return null;
  }
}

function renderPanelActions(
  panelMode: OwnedBookSidePanelMode,
  setPanelMode: (mode: OwnedBookSidePanelMode) => void,
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

export function OwnedBookSidePanel() {
  const panelMode = useOwnedBookStore((state) => state.mode);
  const setPanelMode = useOwnedBookStore((state) => state.setMode);
  const hasSelectedBook = useOwnedBookStore((state) => !!state.ownedBook);

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
