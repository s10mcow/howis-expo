import { atom } from "jotai";
import * as Location from "expo-location";

export const selectedImageAtom = atom(null);

export const selectedImageLocationAtom = atom<{
  location: Location.LocationObject | null;
  place: string;
}>({ location: null, place: "" });
