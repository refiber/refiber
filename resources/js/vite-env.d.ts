/// <reference types="vite/client" />

import { PageProps } from "@inertiajs/core";

declare module "@inertiajs/core" {
	export interface PageProps extends PageProps {
		auth: {
			id: string;
		} | null;
		flash: {
			type: "error" | "success" | "info" | "warning";
			message: string;
		} | null;
	}
}
