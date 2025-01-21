import { PageBreadcrumbs } from "@/components/layout/Breadcrumbs";
import { title } from "@/components/shared/primitives";
import ReadMore from "@/components/shared/ReadMore";
import { siteConfig as strings } from "@/config/site";
import { IGameDetails } from "@/types";
import { Image } from "@nextui-org/image";
import { format } from "date-fns";

interface GameDetailsProps {
  game: IGameDetails;
}

export const GameDetails = ({ game }: GameDetailsProps) => {
  return (
    <>
      <PageBreadcrumbs
        items={[
          { label: strings.games.title, href: "/games" },
          { label: game.name },
        ]}
      />
      <div className="mt-5 lg:mt-10 flex flex-col-reverse lg:flex-row gap-6">
        <div className="flex flex-col gap-y-4 lg:w-1/2">
          <h1 className={title()}>{game.name}</h1>
          <p className="text-default-700">
            <span>{strings.games.details.release_date}: </span>
            {format(game.released, "MMM dd, yyyy")}
          </p>
          <div>
            <ReadMore content={game.description} maxHeight={200} />
          </div>
          <p className="text-default-500">
            <span className="text-default-foreground">Platforms:</span>{" "}
            {game.platforms.map((p: any) => p.platform.name).join(", ")}
          </p>
        </div>
        <div className="lg:w-1/2">
          <Image
            alt={game.name}
            src={game.background_image}
            className="object-cover lg:h-[380px]"
          />
        </div>
      </div>
    </>
  );
};
