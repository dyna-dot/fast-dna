import { ManagedClasses } from "@microsoft/fast-jss-manager-react";
import { CSSBorderRadiusClassNameContract } from "./border-radius.style";
import { ControlOnChangeConfig } from "src/form/templates";
import { Omit } from "utility-types";

export interface CSSBorderRadiusState {
    individualValues?: boolean;
    hasFocus?: BorderRadiusValue | void;
    data?: CSSBorderRadiusValues;
}

export enum BorderRadiusValue {
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomRightRadius,
    borderBottomLeftRadius,
}

export interface CSSBorderRadiusValues {
    borderRadius?: string;
}

export interface CSSBorderRadiusUnhandledProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {}

export interface CSSBorderRadiusHandledProps
    extends ManagedClasses<CSSBorderRadiusClassNameContract> {
    /**
     * The data
     */
    data?: CSSBorderRadiusValues;

    /**
     * The onChange callback
     */
    onChange?: (config: ControlOnChangeConfig) => void;
}

export type CSSBorderRadiusProps = CSSBorderRadiusHandledProps &
    CSSBorderRadiusUnhandledProps;
