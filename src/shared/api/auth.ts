type TokenGetter = () => string | null;
type UnauthorizedHandler = () => void;

let tokenGetter: TokenGetter = () => null;
let unauthorizedHandler: UnauthorizedHandler = () => {
	console.warn("[api] Unauthorized (401) — handler not registered");
};

export function registerTokenGetter(getter: TokenGetter): void {
	tokenGetter = getter;
}

export function registerUnauthorizedHandler(handler: UnauthorizedHandler): void {
	unauthorizedHandler = handler;
}

export function getAccessToken(): string | null {
	return tokenGetter();
}

export function handleUnauthorized(): void {
	unauthorizedHandler();
}
