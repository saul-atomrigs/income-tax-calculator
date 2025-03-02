import Txt from "~/components/Txt";

export default function ResultItem({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      <Txt size="lg">{label}</Txt>
      <Txt size="lg" weight={highlight ? "bold" : "normal"}>
        {value}
      </Txt>
    </div>
  );
}
