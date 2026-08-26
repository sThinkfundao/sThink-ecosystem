import Modal from "../../components/Modal.tsx";

const STEPS = [
  {
    title: "Create a token",
    body: "Name, symbol, artwork. Fixed supply, minted at launch.",
  },
  {
    title: "Pick its quote",
    body: "The asset it trades against: a tokenized stock, a currency, a commodity, another coin.",
  },
  {
    title: "Launch the pair",
    body: "The pool opens quoted in your pick, and the pair reads base-over-quote everywhere on the site.",
  },
];

interface HowPairingWorksProps {
  open: boolean;
  onClose: () => void;
}

export default function HowPairingWorks({ open, onClose }: HowPairingWorksProps) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="how-pairing-title">
      <div className="p-5">
        <h2 id="how-pairing-title" className="text-title font-bold text-ice">
          How pairing works
        </h2>
        <ol className="mt-5 space-y-5">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span aria-hidden="true" className="font-display mt-0.5 text-title text-sky">
                {i + 1}
              </span>
              <div>
                <h3 className="text-ui font-bold text-steel">{step.title}</h3>
                <p className="mt-0.5 text-ui text-teal">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-5 border-t border-edge pt-4 text-ui text-teal">
          Deployment is not wired in this preview build. The launch form below validates your
          setup and shows what would happen.
        </p>
      </div>
    </Modal>
  );
}
