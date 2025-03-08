import { atom } from "jotai";

const accessToken = localStorage.getItem("accessToken");

export const userAuth = atom<boolean | null>(!!accessToken);
