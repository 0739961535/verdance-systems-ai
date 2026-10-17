import { DEPARTMENTS } from "@/data/aiTeam";
import { StatusChip } from "./StatusChip";
import o from "./org.module.css";

/** The team as an org chart: you at the top, operator and reviewer, then six departments of a head and workers. */
export function OrgChart() {
  return (
    <div className={o.chart}>
      <div className={o.node} data-role="attn">
        <StatusChip role="attn">You</StatusChip>
        <p className={o.nodeTitle}>The owner</p>
        <p className={o.nodeBody}>Sees one short list. Approves what goes out.</p>
      </div>
      <span aria-hidden className={o.stem} />
      <div className={o.pair}>
        <div className={o.node}>
          <StatusChip role="operator">Operator</StatusChip>
          <p className={o.nodeTitle}>Turns work into a plan</p>
          <p className={o.nodeBody}>Three lines, not thirty. What to do and why.</p>
        </div>
        <div className={o.node}>
          <StatusChip role="review">Reviewer</StatusChip>
          <p className={o.nodeTitle}>Checks every piece</p>
          <p className={o.nodeBody}>Facts, tone and your rules, before anything moves on.</p>
        </div>
      </div>
      <span aria-hidden className={o.stem} />
      <ul className={o.depts} aria-label="Departments">
        {DEPARTMENTS.map((d) => (
          <li key={d.name} className={o.dept}>
            <div className={o.deptHead}>
              <StatusChip role="dept">Department</StatusChip>
              <h3 className={o.deptName}>{d.name}</h3>
              <span className={o.headRole}>{d.head}</span>
            </div>
            <ul className={o.workers} aria-label={`${d.name} workers`}>
              {d.workers.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
