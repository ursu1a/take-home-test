import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TDiamonds = number[] | [];

export interface IGame {
  id: number;
  name: string;
  released: string;
  background_image: string;
}

export interface IPlatform {
  id: number;
  slug: string;
  name: string;
}

export interface IGameDetails extends IGame {
  description: string;
  platforms: IPlatform[];
}
