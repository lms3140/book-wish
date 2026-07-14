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
  edit: "text-amber-500",
  add: "text-blue-500",
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
      <Card>
        <CardHeader>
          <CardTitle className={titleColorMapping[panelMode]}>
            {titleMapping[panelMode]}
          </CardTitle>
          <CardAction>
            {renderPanelActions(panelMode, setPanelMode, hasSelectedBook)}
          </CardAction>
        </CardHeader>
        <CardContent>{renderPanelContent(panelMode)}</CardContent>
      </Card>
    </div>
  );
}
