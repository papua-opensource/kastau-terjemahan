import { atom } from 'nanostores';
import { ResultItem } from "../lib/words";

export const fetchedData = atom<ResultItem[]>([]);