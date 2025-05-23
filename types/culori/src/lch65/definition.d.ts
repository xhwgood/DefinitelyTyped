import { Lab65 } from "../lab65/types.js";
import lch from "../lch/definition.js";
import { Lch } from "../lch/types.js";
import { Rgb } from "../rgb/types.js";
import { Lch65 } from "./types.js";

interface Lch65DefinitionMixin {
    mode: "lch65";

    parse: ["--lch-d65"];
    serialize: "--lch-d65";

    toMode: {
        lab65: (c: Omit<Lch, "mode">) => Lab65;
        rgb: (c: Omit<Lch, "mode">) => Rgb;
    };

    fromMode: {
        rgb: (c: Omit<Rgb, "mode">) => Lch65;
        lab65: (c: Omit<Lab65, "mode">) => Lch65;
    };

    ranges: {
        l: [0, 100];
        c: [0, 133.807];
        h: [0, 360];
    };
}

declare const modeLch65: Omit<typeof lch, keyof Lch65DefinitionMixin> & Lch65DefinitionMixin;

export default modeLch65;
