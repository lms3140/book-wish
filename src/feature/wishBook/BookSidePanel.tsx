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
import { useEffect, useState } from "react";
import { BookAddForm } from "./BookAddForm";
import { BookEditForm } from "./BookEditForm";

const titleMapping: Record<SidePanelMode, string> = {
  edit: "수정",
  add: "등록",
};

const titleColorMapping: Record<SidePanelMode, string> = {
  edit: "text-amber-500",
  add: "text-blue-500",
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
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 48rem)");
    const update = () => {
      setMatches(media.matches);
    };
    update();

    media.addEventListener("change", update);
    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  const panelMode = useSidePanelStore((state) => state.mode);
  const setPanelMode = useSidePanelStore((state) => state.setMode);
  const hasSelectedBook = useBookStore((state) => !!state.book);

  if (!matches) {
    return null;
  }

  return (
    <div className="w-52">
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
