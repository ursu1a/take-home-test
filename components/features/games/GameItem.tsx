import { format } from "date-fns";

import { siteConfig as strings } from "@/config/site";
import { IGame } from "@/types";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";

interface GameItemProps {
  game: IGame;
}
export const GameItem = ({ game }: GameItemProps) => {
  return (
    <Link href={`/games/${game.id}`}>
      <Card radius="sm">
        <CardHeader className="flex flex-col pb-2 items-start">
          <strong className="font-semibold">{game.name}</strong>
          <small className="text-default-500 text-sm">
            <span>{strings.games.details.release_date}: </span>
            {format(game.released, "MMM dd, yyyy")}
          </small>
        </CardHeader>
        <CardBody className="p-0">
          <Image
            alt={game.name}
            src={game.background_image}
            radius="none"
            isZoomed
            className="object-cover w-full"
            width="100%"
            height={200}
          />
        </CardBody>
      </Card>
    </Link>
  );
};
