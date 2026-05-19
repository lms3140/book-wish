import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSidePanelStore, type SidePanelMode } from "@/store/sidePanelStore";
import { BookAddForm } from "./book/BookAddForm";
import { BookDetail } from "./book/BookDetail";
import { BookEditForm } from "./book/BookEditForm";
import { useEffect, useState } from "react";

const titleMapping: Record<SidePanelMode, string> = {
  detail: "상세",
  edit: "수정",
  add: "등록",
};

function renderPanelContent(panelMode: SidePanelMode) {
  if (panelMode === "detail") {
    return <BookDetail />;
  }

  if (panelMode === "add") {
    return <BookAddForm />;
  }

  if (panelMode === "edit") {
    return <BookEditForm />;
  }

  return null;
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

  if (!matches) {
    return null;
  }

  return (
    <div className="w-52">
      <Card>
        <CardHeader>
          <CardTitle>{titleMapping[panelMode]}</CardTitle>
          <CardAction>
            <Button
              onClick={() => setPanelMode("edit")}
              disabled={panelMode === "edit"}
            >
              수정
            </Button>
            <Button
              onClick={() => setPanelMode("add")}
              disabled={panelMode === "add"}
            >
              등록
            </Button>
            <Button
              onClick={() => setPanelMode("detail")}
              disabled={panelMode === "detail"}
            >
              상세
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>{renderPanelContent(panelMode)}</CardContent>
      </Card>
    </div>
  );
}
