import { STAGES } from "@/data/aiTeam";
import { StatusChip } from "./StatusChip";
import o from "./org.module.css";

/**
 * Department, Reviewer, Operator, You. The same four stops, in the same
 * order and colours, as the lanes of the sample command centre above.
 * Vertical on phones, a row on desktop. Static.
 */
export function FlowDiagram() {
  return (
    <ol className={o.flow} aria-label="How work moves: department, reviewer, operator, you">
      {STAGES.map((st, i) => (
        <li key={st.role} className={o.step} data-role={st.role}>
          <span className={o.stepNum}>{String(i + 1).padStart(2, "0")}</span>
          <span className={o.chipRow}>
            <StatusChip role={st.role}>{st.role === "attn" ? "You" : st.label}</StatusChip>
          </span>
          <h3 className={o.stepTitle}>{st.role === "attn" ? "You decide" : st.label}</h3>
          <p className={o.stepBody}>{st.body}</p>
        </li>
      ))}
    </ol>
  );
}
