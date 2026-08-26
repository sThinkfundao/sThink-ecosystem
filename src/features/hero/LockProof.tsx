import { external, isSet } from "../../config.ts";

/*
 * A static claim driven by config: one line, no fetch, no countdown.
 * "unlocks <date>" stays true after the date passes, where a LOCKED badge
 * or "locked until" would not. With no lock configured it renders nothing —
 * absence of a lock is not something to advertise.
 */
export default function LockProof() {
  const lock = external.lock;
  if (!isSet(lock)) return null;

  return (
    <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-ui text-teal">
      <span>
        <span className="font-mono text-steel">{lock.amount}</span> locked · unlocks{" "}
        {lock.unlockDate}
      </span>
      <a
        href={lock.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View the token lock proof on Streamflow"
        className="hit px-1 text-sky transition-colors duration-100 hover:text-ice"
      >
        View proof
      </a>
    </p>
  );
}
