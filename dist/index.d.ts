type ErrorProps = Record<string, any>;
declare class ErrBoost extends Error {
    timestamp: string;
    isBoosted: boolean;
    cause?: Error;
    [key: string]: any;
    constructor(message: string, props?: ErrorProps, original?: Error);
    /**
     * Enhanced JSON support - standard Errors usually stringify to {}
     */
    toJSON(): ErrorProps;
}
/**
 * The Main Factory Function
 */
declare const errBoost: {
    (originalOrProps?: Error | string | ErrorProps, propsOrMsg?: ErrorProps | string, msg?: string): ErrBoost;
    type(propsOrMsg?: ErrorProps | string, msg?: string): ErrBoost;
    range(propsOrMsg?: ErrorProps | string, msg?: string): ErrBoost;
    syntax(propsOrMsg?: ErrorProps | string, msg?: string): ErrBoost;
    wrap(err: unknown, context?: ErrorProps, message?: string): ErrBoost;
};

export { ErrBoost, errBoost as default, errBoost };
