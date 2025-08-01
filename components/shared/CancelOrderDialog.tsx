"use client";

import { useState } from "react";
import GlobalDialog from "@/components/shared/GlobalDialog";
import { ScrollArea } from "../ui/scroll-area";
import { useTranslations } from "next-intl"; 

type Reason = {
  id: number;
  desc: string | null;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: (reasonKey: string, reasonNote: string) => void;
  reasons: Reason[];
};

const CancelOrderDialog: React.FC<Props> = ({
  open,
  onClose,
  onConfirm,
  reasons,
}) => {
  const [selectedReason, setSelectedReason] = useState<string | number>(
    "not_satisfied",
  );
  const [note, setNote] = useState<string>("");
  const t = useTranslations("CANCEL_ORDER_DIALOG"); 

  const handleConfirm = () => {
    onConfirm(String(selectedReason), note);
  };

  return (
    <GlobalDialog
      open={open}
      onOpenChange={onClose}
      title={t("select_reason_title")}
      height="!h-[420px]"
      footer={
        <button
          className="confirm-btn h-10 w-1/2 rounded-2xl px-4 py-2"
          onClick={handleConfirm}
        >
          {t("confirm_cancel_button")}
        </button>
      }
    >
      <ScrollArea>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            {reasons.map((reason) => (
              <label key={reason.id} htmlFor={`reason_${reason.id}`}>
                <div className="flex cursor-pointer items-center justify-start gap-3 rounded-2xl bg-white/60 p-4">
                  <input
                    type="radio"
                    id={`reason_${reason.id}`}
                    name="cancel_reason"
                    value={reason.id}
                    checked={selectedReason === reason.id}
                    onChange={() => setSelectedReason(reason.id)}
                  />
                  {reason.desc || t("reason_placeholder", { id: reason.id })}
                </div>
              </label>
            ))}

            <label htmlFor="reason_other">
              <div className="flex cursor-pointer items-center justify-start gap-3 rounded-2xl bg-white/60 p-4">
                <input
                  type="radio"
                  id="reason_other"
                  name="cancel_reason"
                  value="other"
                  checked={selectedReason === "other"}
                  onChange={() => setSelectedReason("other")}
                />
                {t("other_reason_label")}
              </div>
            </label>
          </div>

          <div className="flex w-full flex-col justify-center">
            <label htmlFor="note" className="mb-1 block font-medium">
              {t("note_label")}{" "}
              {selectedReason === "other" && (
                <span className="text-red-500">*</span>
              )}
            </label>
            <textarea
              id="note"
              className="focus:ring-primary h-[100px] w-full justify-start rounded-md border px-3 py-2 text-start outline-none focus:ring-2"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t("note_placeholder")}
            />
          </div>
        </div>
      </ScrollArea>
    </GlobalDialog>
  );
};

export default CancelOrderDialog;