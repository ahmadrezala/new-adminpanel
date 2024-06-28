import { tailwindColors } from "../../../../tailwind.config";

export const Colors: React.FC = () => (
  <div className="flex flex-wrap justify-center">
    {Object.entries(tailwindColors).map(([name, color]) => (
      <ColorBox key={name} name={name} color={color} />
    ))}
  </div>
);

const ColorBox: React.FC<{ name: string; color: string }> = ({
  name,
  color,
}) => (
  // console.log(name);
  <div
    style={{ backgroundColor: color }}
    className="text-[green] w-96 h-40 flex justify-center items-center"
  >
    {name}
  </div>
);
